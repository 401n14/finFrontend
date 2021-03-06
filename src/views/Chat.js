/* istanbul ignore file */
//Removing chat from tests b/c sockets cause Travis failure. We pulled as many components out as possible

import React, { useState, useEffect, useCallback } from 'react';
import useSockets from '../utils/useSockets';
import { useAuth0 } from '../react-auth0-spa.js';
import FormSelect from '../components/FormSelect';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import ChatMessages from '../components/ChatMessages';
import ChatUsers from '../components/ChatUsers';

import data from '../components/data/data';

const fetch = require('node-fetch');

function Chat() {
  const [name, setName] = useState(null);
  const [welcome, setWelcome] = useState('Welcome!');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('English');
  const [translation, setTranslation] = useState('en');
  const [groupMessage, setGroupMessage] = useState([]);
  const [userGroup, setUserGroup] = useState({});
  const [activeUsers, setActiveUsers] = useState('');
  const { socket, socketVal, isConnected } = useSockets(
    'https://final-tcp-server.herokuapp.com/',
    'broadcast'
  );
  const { user } = useAuth0();

  const getLanguage = useCallback(async () => {
    let res = await fetch(
      'https://translation-server.herokuapp.com/detect?language=' + language
    );
    let json = await res.text();
    setTranslation(json);
  }, [language]);

  const translateMessage = useCallback(
    async data => {
      let res = await fetch(
        'https://translation-server.herokuapp.com/translate?message=' +
        data.message +
        '&translation=' +
        data.translation
      );
      let json = await res.text();

      socketVal.message = await json;
      let timeStamp = new Date();
      let msg = [...groupMessage];
     
      msg.push(`${timeStamp.toLocaleString()} *${socketVal.pic} * ${socketVal.name.toUpperCase()} * ${socketVal.message}`);

      setGroupMessage(msg);
    },
    [socketVal.message, socketVal.name]
  );

  const handleEnter = e => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    let pic = user.picture;
    if (message) {
      socket.emit('message', { name, message , pic});
    }
    setMessage('');
  };

  useEffect(() => {
    if (socketVal.exitMessage) {
      setWelcome(socketVal.exitMessage);
    }
  }, [socketVal, socketVal.exitMessage]);

  useEffect(() => {
    if (socketVal.userGroup) {
      setUserGroup(socketVal.userGroup);
    }
  }, [socketVal.userGroup, userGroup]);

  useEffect(() => {
    setName(user.nickname);
    if (name) {
      socket.emit('username', { name });
    }
  }, [name, socket, user.nickname]);

  useEffect(() => {
    if (socketVal.user) {
      setWelcome(`${socketVal.user} has joined the chat!`);
    }
  }, [socketVal.user]);

  useEffect(() => {
    getLanguage();
  }, [getLanguage]);

  useEffect(() => {
    if (socketVal.name && socketVal.message) {
      (async () => {
        await translateMessage({ message: socketVal.message, translation });
      })();
    }
  }, [socketVal]);

  useEffect(() => {
    const messages = document.querySelector('.overflow');
    messages.scrollTop = messages.scrollHeight;

  }, [groupMessage]);

  useEffect(() => {
    let uniqueGroup = new Set(Object.values(userGroup));
    let list = Array.from(uniqueGroup).map((user, index) => <p key={index} className='secondary'>{user}</p>)
    setActiveUsers(list);
  }, [userGroup])

  return (
    <div>
      <Header>{welcome}{activeUsers}</Header>

      <div className='chat'>
        <div className='connection-information'>
          <h3 className=' primary bold'>
            {isConnected
              ? 'You are connected to the chat'
              : 'You are not connected to the chat'}
          </h3>
         
          <FormSelect
            list={data.Languages}
            onChange={e => {
              setLanguage(e.target.value);
            }}
          />

        </div>
        <div className='chat-messages' id='chat'>
          <ChatMessages className='chat'>{groupMessage}</ChatMessages>

        </div>
        <SendMessage
          onClick={sendMessage}
          value={message}
          onKeyUp={handleEnter}
          onChange={e => {
            setMessage(e.target.value);
          }}
        />


      </div>
    </div>

  );
}

export default Chat;
