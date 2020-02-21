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
        <button className='chat-button' onClick={props.onClick}>
          Send Message
        </button>
        <input
          type='text'
          className='chat-input'
          value={props.value}
          onKeyUp={props.onKeyUp}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SendMessage;
