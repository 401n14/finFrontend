import React from 'react';
/**
 * Component for displaying header - when user joins/leaves the chat
 * @component Header
 * @param {object} props
 * @return {ReactElement} HTML markup
 */
function Header(props) {
    return (
        <div>
            <h1 className='chat-heading'>{props.children}</h1>
        </div>
    )
}

export default Header;