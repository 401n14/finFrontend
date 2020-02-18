import React, { useState, useEffect, useCallback } from 'react';
import useSockets from '../utils/useSockets';
import { useAuth0 } from '../react-auth0-spa.js';
import FormSelect from '../components/FormSelect';
import data from '../components/data/data';



const fetch = require('node-fetch');

/**
 * @function chat  component 
 * Set and Initialize state variables name , welcome, message , language ,
 * translation , groupMessaging, userGroup.
 * @exports default chat
 */

  



function Chat() {
  const [name, setName] = useState(null);
  const [welcome, setWelcome] = useState('Welcome!');
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState('English');
  const [translation, setTranslation] = useState('en');
  const [groupMessage, setGroupMessage] = useState([]);
  const [userGroup, setUserGroup] = useState({});

  /**
   * @param { object } end points or events  socket, socketVal and isConnected 
   *  fetch data from backend socket server 
   */
  const { socket, socketVal, isConnected } = useSockets(
    'https://final-tcp-server.herokuapp.com/',
    'broadcast'
  );

  /**
   * @param { object}  user 
   * initialize auth0 
   */
  const { user } = useAuth0();

  /**
   * @function   getLanguage
   * @function  cb  asynchronously  fetch data from translation server + language
   * set translated language state in json format and update language 
   */

  const getLanguage = useCallback(async () => {
    let res = await fetch(
      'https://translation-server.herokuapp.com/detect?language=' + language
    );
    let json = await res.text();
    setTranslation(json);
   
  }, [language]);


  /**
   * @function translateMessage
   * cb asynchronously fetch data from translation server + data.message, &translation and data.translation
   * assign soketVal.message variable to json format response 
   * @push to updated state objects socketVal name and message 
   */

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

/**
 * 
 * @param {object} e  event object for senMessage handler 
 * if message emit event or endpoint  message 
 * else message state variable to empty string 
 */


  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('message', { name, message });
    }
    setMessage('');
  };

/**
 * all useEffect functions runs both after first render and after every update of 
 * exitMessage
 * userGroup
 * username
 * nickname
 * 
 */

  useEffect(() => {
    if (socketVal.exitMessage) {
      setWelcome(socketVal.exitMessage);
    }
  }, [socketVal, socketVal.exitMessage]);

  useEffect(() => {
    if (socketVal.userGroup) {
      setUserGroup(socketVal.userGroup);
      console.log('USER GROUP: ', userGroup);
    }
  }, [socketVal.userGroup, userGroup]);

  useEffect(() => {
    setName(user.nickname);
    if (name) {
      socket.emit("username", {name});
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

  /** render 
   * DOM elements 
   */

  return (
    <div className='Chat'>
      <h1 className='chat-heading'>{welcome}</h1>
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

      <div className='chat-section'>
        <button className='chat-button' onClick={sendMessage}>
          Send Message
        </button>
        <input
          type='text'
          className='chat-input'
          value={message}
          onKeyUp={handleEnter}
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <p className='chat-output'>{groupMessage}</p>
    </div>
  );
}

export default Chat;
