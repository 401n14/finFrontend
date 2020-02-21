import React from 'react';

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
