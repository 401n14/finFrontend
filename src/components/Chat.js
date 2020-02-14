import React, { useState, useEffect } from "react";
import "../styles/chat.scss";
import useSockets from "./useSockets";
const fetch = require('node-fetch');

const apiKey = process.env.GOOGLE_API_KEY;

let options = {
  concurrentLimit: 20,
  requestOptions: {},
};

const googleTranslate = require('google-translate')(apiKey, options);


function Chat() {
  const [name, setName] = useState(null);
  const [welcome, setWelcome] = useState("Welcome!");
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState("en");
  const [groupMessage, setGroupMessage] = useState(null);
  const { socket, socketVal, isConnected } = useSockets(
    "https://jamesdunn-lab23.herokuapp.com/",
    "broadcast"
  );


  const getTranslation = async () => {
      let res = await fetch('http://localhost:3000/detect?language=' + language);
      let json = await res.text();
      console.log('JSON RESULTS: ', json);
  }

  const sendGreeting = () => {
    if (name) setWelcome(`Hi ${name}! Welcome to the Chat!`);
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.target.className === "name-input" ? setUserName(e) : sendMessage(e);
    }
  };

  const selectLanguage = async e => {
    await googleTranslate.detectLanguage(e.target.value, async function(err, detection) {
        // if unable to detect a language >> default to english
        if (!detection) {
          setLanguage('en');
        } else {
          setLanguage(detection.language);
        }
  });
}

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
    getTranslation();
  };

  useEffect(() => {
      if (socketVal.name && socketVal.message) {
        googleTranslate.translate(socketVal.message, language, function (err, translation) {
            /**
                       * sends the translated message consisting of '{user: user, color: data.color, message: translation.translatedText}'
                       * @event message
                       * @param {string} message message event
                       * @param {object} translationData {user: object, color: string, message, string}
                       * @param {object} user user object
                       * @param {string} data.color color from the data object
                       * @param {string} translation.translatedText translated version of the text
                       */
                      setGroupMessage(`${socketVal.name}:  ${translation.translatedText}`);
            });
        }
  }, [socketVal, language]);

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
        <select onChange={selectLanguage}>
          <option>Select Language</option>
          <option>English</option>
          <option>Espanol</option>
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
