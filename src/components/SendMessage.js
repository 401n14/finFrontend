import React from 'react';
/**
 * Component for sending messages
 * Input field for users to enter a message
 * Button to send message
 * @component SendMessage
 * @param {object} props
 * @return {ReactElement} HTML markup
 */
function SendMessage(props) {
  return (
    <div>
      <div className='chat-section'>
        <input
          type='text'
          className='chat-input, chat-typing input-text'
          value={props.value}
          onKeyUp={props.onKeyUp}
          onChange={props.onChange}
        />
        <button className='btn btn-secondary chat-btn' onClick={props.onClick}>
          Send Message
        </button>
        <svg
          className="chat-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill='red'
        >
          <path d="M18 12v1H8v5l-6-6 6-6v5h8V2h2z" />
        </svg>
      </div>
    </div>
  );
}

export default SendMessage;
