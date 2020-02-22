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


//emoji set up

import "emoji-mart/css/emoji-mart.css";
import { Picker } from 'emoji-mart';
import Button from '../components/Button';

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
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('English');
  const [translation, setTranslation] = useState('en');
  const [groupMessage, setGroupMessage] = useState([]);
  const [userGroup, setUserGroup] = useState({});


  const [showEmojis, setShowEmojis] = useState(false);

  /**
   * @param { object } end points or events  socket, socketVal and isConnected 
   *  fetch data from backend socket server 
   */
  const [activeUsers, setActiveUsers] = useState('');
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

  let addEmoji = e => {
    setMessage(e.native);
    let emoji = e.native;
    setShowEmojis({
      text: showEmojis + emoji
    });
  };


  let closeMenu = (e) => {
    if (setShowEmojis.emojiPicker !== null && !setShowEmojis.emojiPicker.contains(e.target)) {
      setShowEmojis(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", closeMenu())
      );
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
    let pic = user.picture;
    if (message) {
      socket.emit('message', { name, message , pic});
    }
    setMessage('');
  };

  /**
   * all the following  functions passed to useEffect will run after render is commited to the screen
  */

  /**
 * @function  translateMessage passed to useEffect 
 * @param { object } , message state and translation 
 *  
 */

  /**
   * @function getLanguage passed to useEffect
   * will run after render is commited to the screen
   */

  /**
   * @function  setUserGroup 
   * @param { object } 
   * and console log user and user group 
   */

  /**
   * @function setName,
   * @param { object } user nickname
   * emit username endpoint/ event  from client socket 
   */

  /**
   * @function setWelcome 
   * @param { object } socket value of user 
   * return user joined the chat ! string 
   */
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


  /**
   * render dom elemnts h3, form, input button ...
   */


  useEffect(() => {
    const messages = document.querySelector('.overflow');
    messages.scrollTop = messages.scrollHeight;

  }, [groupMessage]);

  useEffect(() => {
    let list = Object.keys(userGroup).map((user, index) => <p key={index} className='secondary'>{userGroup[user]}</p>)
    setActiveUsers(list);
  }, [userGroup, message])

  useEffect( () => {
    let emojis = document.querySelector('#emoji');
    if(emojis){
      emojis.addEventListener('mouseup', () => {
        setTimeout( () => {
          setShowEmojis(false);
        }, 500)
      })
    }
  
  },[showEmojis])

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
        {showEmojis ? (<span ref={el => setShowEmojis.emojiPicker = el}>
          <div className='emoji mobile' id='emoji'>
            <Picker
              onSelect={addEmoji}
              emojiTooltip={true}
              title="weChat"
            />
          </div>

        </span>) : (
            <div className='emoji mobile'>
              <button className='emoji-x' onClick={() => setShowEmojis(true)}>
                {String.fromCodePoint(0x1f60a)}
              </button>

            </div>
          )}


      </div>
    </div>

  );
}

export default Chat;
