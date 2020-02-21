import React from 'react';

function Header(props) {
    return (
        <div className='user-messages'>
            <h1 className='chat-heading'>{props.children}</h1>
        </div>
    )
}

export default Header;