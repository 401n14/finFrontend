import React from 'react';
/**
 * Component for displaying header - when user joins/leaves the chat
 * @component Header
 * @param {object} props
 * @return {ReactElement} HTML markup
 */
function Header(props) {
    return (
        <div className='user-messages'>
            <h1 className='chat-heading'>{props.children[0]}</h1>
            <div className='chat-heading'>
                <h2>Active Users</h2>
                {props.children[1]}
            </div>
        </div>
    )
}

export default Header;