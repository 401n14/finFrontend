import React from 'react';

/**
 * Component for displaying chat messages
 * @component ChatMessages
 * @param {object} props - an array of chat messages 
 * @return {ReactElement} HTML markup
 */
function ChatMessages(props) {
    return (
        <div>{props.children && props.children.length ? props.children.map((item, ind) => {
            return <p key={ind}>{item}</p>
        }) : ''}</div>
    )
}

export default ChatMessages;