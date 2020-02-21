import React from 'react';
import { useAuth0 } from "../react-auth0-spa";
function ChatMessages(props) {
    const { user} = useAuth0();
    return (
        <div className='overflow'>{props.children && props.children.length ? props.children.map((item, ind) => {
            let itemArray= (item.split('PM' || 'AM'));
            let timestamp = itemArray[0];
            let message = itemArray[1].split(':')[1];

            return (
                <div key={ind} className={`${props.className}-information`}>
                    <div className={`${props.className}-information-user`}>
                        <div
                            className={`${props.className}-information-avatar`}
                            style={{
                                backgroundImage: `url(${user.picture})`
                            }}
                        />
                        <h3 className={`${props.className}-information-username`}>{user.nickname}</h3>
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