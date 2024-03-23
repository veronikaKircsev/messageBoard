
import {Message} from './App';
import MessageListItem from './MessageListItem';
import styles from './style.module.css';
import React, { useRef, useEffect, useState } from 'react';



type Props = {
  messages: Array<Message>;
  num: number;
  count: number;
  handleMarkRead(id:number): void;
};



export default function MessageList({messages, num, count,  handleMarkRead}: Props) {


  const [selectedIndex, setSelectedIndex] = useState(null);
  const messageRefs = useRef([]);

  useEffect(() => {
    // Focus the first message when the component mounts
    if (messages.length > 0) {
      setSelectedIndex(0);
    }
  }, [messages]);

  useEffect(() => {
    // Focus the selected message when selectedIndex changes
    if (selectedIndex !== null && messageRefs.current[selectedIndex]) {
      messageRefs.current[selectedIndex].focus();
    }
  }, [selectedIndex]);


  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowDown':
        // Move focus to the next message when the down arrow is pressed
        setSelectedIndex(prevIndex => (prevIndex < messages.length - 1 ? prevIndex + 1 : prevIndex));
        break;
      case 'ArrowUp':
        // Move focus to the previous message when the up arrow is pressed
        setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        break;
      case 'Enter':
        // Mark the message as read when Enter is pressed
        {!messages[index].isRead && handleMarkRead(messages[index].id)}; // Pass the ID of the message to the handler
        break;
      default:
        break;
    }
  };



  return (
    <div className={styles.messageList}>
      {count !== 0 ? <p>You have {num} message</p> : <p>You don't have any messages</p>}
    <ul>
      {messages.map((message, index) => (
        <div key={message.id} ref={(el) => (messageRefs.current[index] = el)} 
        tabIndex={0} 
        onKeyDown={(event) => handleKeyDown(event, index)}>
        <MessageListItem
          key={message.id}
          message={message}
          handleMarkRead={handleMarkRead}

        />
        </div>
      ))}
    </ul>
    </div>
  );
}
