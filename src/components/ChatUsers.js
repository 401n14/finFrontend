/* istanbul ignore file */
//Ignoring this file for testing b/c it is not used

import React from 'react';

/**
 * Component for displaying users connected to the chat
 * @component ChatUers
 * @param {object} props - an array of connected chat users
 * @return {ReactElement} HTML markup
 */
function ChatUsers(props) {
  let users;
  if (Object.keys(props.children)) {
    users = Object.values(props.children);
  }

  return (
    <div>
      <ul> Online Users
        {users
          ? users.map((item, ind) => {
             return <li key={ind}>{item}</li>;
            })
          : ''}
      </ul>
    </div>
  );
}

export default ChatUsers;
