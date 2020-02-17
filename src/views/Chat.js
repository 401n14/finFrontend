import React, { useState, useEffect, useCallback } from "react";
import useSockets from "../utils/useSockets";
import { useAuth0 } from "../react-auth0-spa.js";
import FormSelect from "../components/FormSelect";
import data from '../components/data/data';

const fetch = require('node-fetch');

function Chat() {
  const [name, setName] = useState(null);
  const [welcome, setWelcome] = useState("Welcome!");
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState("English");
  const [translation, setTranslation] = useState("en");
  const [groupMessage, setGroupMessage] = useState([]);
  const { socket, socketVal, isConnected } = useSockets(
    "https://jamesdunn-lab23.herokuapp.com/",
    "broadcast"
  );
  const { user } = useAuth0();

  const getLanguage = useCallback (
      async () => {
      let res = await fetch('https://transcribe-chat-server.firebaseapp.com/detect?language=' + language);
      let json = await res.text();
      setTranslation(json);
  }, [language]);

  const translateMessage = useCallback(
      async data => {
      let res = await fetch('https://transcribe-chat-server.firebaseapp.com/translate?message=' + data.message + '&translation=' + data.translation);
      let json = await res.text();
      socketVal.message = await json;

      let msg = [...groupMessage];
      msg.push(<p>`${socketVal.name}:  ${socketVal.message}`</p>)
      
      setGroupMessage(msg);
  
  }, [socketVal.message, socketVal.name, groupMessage]);

  const handleEnter = e => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { name, message });
    }
    setMessage('');
  };

  useEffect(() => {
    setName(user.nickname);
    setWelcome(`Hi ${name}! Welcome to the Chat!`)
    
  }, [name, user.nickname]);

  useEffect(() => {
    getLanguage();
  }, [getLanguage, language])

  useEffect(() => {
      if (socketVal.name && socketVal.message) {
          (async () => {
        await translateMessage({message: socketVal.message, translation});
          })();
        
        }
  }, [socketVal, translateMessage, translation]);

  return (
    <div className="Chat">
      <h1 className="chat-heading">{welcome}</h1>
      <h3>
        {isConnected
          ? "You are connected to the chat"
          : "You are not connected to the chat"}
      </h3>

      <FormSelect list={data.Languages}  onChange={e => {
            setLanguage(e.target.value)}} />

      <div className="chat-section">
        <button className="chat-button" onClick={sendMessage}>
          Send Message
        </button>
        <input
          type="text"
          className="chat-input"
          value={message}
          onKeyUp={handleEnter}
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <p className="chat-output">{groupMessage}</p>
    </div>
  );
}

export default Chat;