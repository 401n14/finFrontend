import React, { useState, useEffect, useCallback } from 'react';
import useSockets from '../utils/useSockets';
import { useAuth0 } from '../react-auth0-spa.js';
import FormSelect from '../components/FormSelect';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';

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

      let msg = [...groupMessage];

      msg.push(
        <p>
          {socketVal.name}: {socketVal.message}
        </p>
      );

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
    if (message) {
      socket.emit('message', { name, message });
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

  return (
    <div className='Chat'>
      <Header>{welcome}</Header>

      <h3>
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

      <SendMessage
        onClick={sendMessage}
        value={message}
        onKeyUp={handleEnter}
        onChange={e => {
          setMessage(e.target.value);
        }}
      />

      <p className='chat-output'>{groupMessage}</p>
    </div>
  );
}

export default Chat;
