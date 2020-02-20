import React from 'react';

function ChatMessages(props) {
    return (
        <div>{props.children && props.children.length ? props.children.map((item, ind) => {
            return <p key={ind}>{item}</p>
        }) : ''}</div>
    )
}

export default ChatMessages;