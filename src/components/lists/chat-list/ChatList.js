import React from 'react';
import classes from './ChatList.module.css';
import Chat from '../../../components/chat/Chat';

class ChatList extends React.Component {
    render() {
        const {chats} = this.props;
        return (
            <div className={classes.ChatList}>
                {chats.map(chat => {
                    return (
                        <Chat key={chat.id} chat={chat} />
                    )
                })}
            </div>
        );
    }
}

export default ChatList;
