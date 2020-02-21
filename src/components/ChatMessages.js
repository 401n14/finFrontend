import React from 'react';
function ChatMessages(props) {
    return (
        <div className='overflow'>{props.children && props.children.length ? props.children.map((item, ind) => {
            let itemArray= (item.split('PM' || 'AM'));
            let timestamp = itemArray[0];
            let message = itemArray[1].split(':')[1];
            let user = itemArray[1].split(':')[0];
            console.log(user);

            return (
                <div key={ind} className={`${props.className}-information`}>
                    <div className={`${props.className}-information-user`}>
                        <div
                            className={`${props.className}-information-avatar`}
                            style={{
                                backgroundImage: `url()`
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