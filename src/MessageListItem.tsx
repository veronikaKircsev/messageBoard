
import {useState} from 'react';
import {Message} from './App';
import CreateMessage from './CreateMessage';
import styles from './style.module.css';


type Props = {
  message: Message;
  handleMarkRead(id: number): void;
};


export default function MessageListItem({ message, handleMarkRead}: Props) {

  const messagePrams = message.text.split(",");
    const subject = messagePrams[0] as string;
    const body = messagePrams[1] as string;
    

  return (

    <li aria-selected="false" onClick={() => {!message.isRead && handleMarkRead(message.id)}} className={message.isRead ? styles.messageRed : styles.message}>
      <CreateMessage subject={subject} body={body}/>
    </li>
  );
}
