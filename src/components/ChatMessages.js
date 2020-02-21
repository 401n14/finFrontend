import React from 'react';


/**
 * Component for displaying chat messages
 * @component ChatMessages
 * @param {object} props - an array of chat messages 
 * @return {ReactElement} HTML markup
 */
function ChatMessages(props) {
    return (
        <div className='overflow'>{props.children && props.children.length ? props.children.map((item, ind) => {
            let itemArray= (item.split('PM' || 'AM'));
            let timestamp = itemArray[0];
            let message = itemArray[1].split('*')[3];
            let user = itemArray[1].split('*')[2];
            let pic = itemArray[1].split('*')[1];
        

            return (
                <div key={ind} className={`${props.className}-information`}>
                    <div className={`${props.className}-information-user`}>
                        <div
                            className={`${props.className}-information-avatar`}
                            style={{
                                backgroundImage: `url(${pic})`
                            }}
                        />
                        <h3 className={`${props.className}-information-username`}>{user}</h3>
                        <p className={`${props.className}-information-timestamp`}>{timestamp}</p>
                    </div>
                    <p className={`${props.className}-information-message`}>
                        {message}
                    </p>
                </div>
            );
        }) : ''}</div>
    )
}

export default ChatMessages;