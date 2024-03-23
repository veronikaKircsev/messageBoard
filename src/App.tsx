

import {useState, useEffect, useRef} from 'react';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
import ClickableHeader from './ClickableHeader';
import styles from './style.module.css';
import {Tabs, TabList, Tab, TabPanel} from 'react-aria-components';
import './tab.css';



export type Message = {
  id: number;
  text: string;
  isRead: boolean;
};

let curId = 0;

export default function App() {
  const [messages, setmessages] = useState<Array<Message>>([]);

  function onSubmit(message: string) {
    const id = curId++;

    const thisMessage = {id: id,
      text: message} as Message;

    const nextMessages = [thisMessage, ...messages];

    setmessages(nextMessages);
    
  }



  const [count, setCount] = useState(0); // Zentraler Zustand für den Zähler

  const increment = () => {
    setCount(count + 1); // Zähler erhöhen
  };

  const decrement = () => {
    setCount(count - 1); // Zähler verringern
  };

  const num = count > 5 ? "5+" : count.toString();

  const headerName = count ===0 ? "Message " : "Message " + num as string;	


  function handleMarkRead(index: number) {
    decrement();
    setmessages((prevMessages) => {
      
      return prevMessages.map((message, messageIndex) => messageIndex === prevMessages.length - 1 - index
        ? { ...message, isRead: !message.isRead } // Toggle read status
        : message
      );
    });

  };

  const [activeTab, setActiveTab] = useState('addMessage');

  const tabRefs = {
    addMessage: useRef(null),
    messages: useRef(null),
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && activeTab === 'addMessage') {
        setActiveTab('messages');
      } else if (event.key === 'ArrowLeft' && activeTab === 'messages') {
        setActiveTab('addMessage');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab]);

  return (
    <div className={styles.root}>
      <h1 style={{ fontWeight: 'bold' }}>Message Board</h1>
      <div className={styles.board}>
        <Tabs className={'react-aria-Tabs'} >
          <TabList className={styles['react-aria-TabList']} > 
            <Tab id="addMessage" className={styles['react-aria-Tab']}>
              <ClickableHeader title="Add Message"
         aria-pressed="true"
          aria-selected={activeTab === 'addMessage'}
          onClick={() => setActiveTab('addMessage')}
        /></Tab>
            <Tab id = "message" className={styles['react-aria-Tab']}>
              <ClickableHeader title = {headerName}
         aria-pressed="false"
          aria-selected={activeTab === 'messages'}
          onClick={() => setActiveTab('messages')}
        /></Tab>
          </TabList>
          <TabPanel id='addMessage' className={styles['react-aria-TabPanel']}>
          <AddMessageForm onSubmit={onSubmit} increment ={increment}/>
          </TabPanel>
          <TabPanel id='message' className={styles['react-aria-TabPanel']}>
          <MessageList messages={messages} count={messages.length} num={count} handleMarkRead={handleMarkRead}/>
          </TabPanel>
        </Tabs>
  </div>
    </div>
  );
}
