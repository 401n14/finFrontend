import React from 'react';

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