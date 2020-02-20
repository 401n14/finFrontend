import React from 'react';

function Header(props) {
    return (
        <div>
            <h1 className='chat-heading'>{props.children}</h1>
        </div>
    )
}

export default Header;