import React, { useState, useEffect, useCallback } from "react";
import "../styles/chat.scss";
import useSockets from "./useSockets";
const fetch = require('node-fetch');

function Chat() {
  const [name, setName] = useState(null);
  const [welcome, setWelcome] = useState("Welcome!");
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState("English");
  const [translation, setTranslation] = useState("en");
  const [groupMessage, setGroupMessage] = useState(null);
  const { socket, socketVal, isConnected } = useSockets(
    "https://jamesdunn-lab23.herokuapp.com/",
    "broadcast"
  );


  const getLanguage = useCallback (
      async () => {
      let res = await fetch('https://translation-server.herokuapp.com/detect?language=' + language);
      let json = await res.text();
      setTranslation(json);
  }, [language]);

  const translateMessage = useCallback(
      async data => {
      let res = await fetch('https://translation-server.herokuapp.com/translate?message=' + data.message + '&translation=' + data.translation);
      let json = await res.text();
      socketVal.message = await json;
      setGroupMessage(`${socketVal.name}:  ${socketVal.message}`);
  }, [socketVal.message, socketVal.name]);

  const sendGreeting = () => {
    if (name) setWelcome(`Hi ${name}! Welcome to the Chat!`);
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.target.className === "name-input" ? setUserName(e) : sendMessage(e);
    }
  };

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { name, message });
    }
    setMessage('');
  };

  const setUserName = e => {
    e.preventDefault();
    sendGreeting();
  };

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
      <div className="name-section">
        <button className="name-button" onClick={setUserName}>
          Submit Name
        </button>
        <input
          type="text"
          className="name-input"
          onKeyUp={handleEnter}
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <select onChange={e => {
            setLanguage(e.target.value);
        }}>
          <option>Select Language</option>
          <option>English</option>
          <option>Espanol</option>
          <option>አማርኛ</option>
          <option>русский</option>
          <option>日本語</option>
        </select>
      </div>
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
