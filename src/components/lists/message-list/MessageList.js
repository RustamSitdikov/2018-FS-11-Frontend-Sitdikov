import React from 'react';
import classes from './MessageList.css'
import Message from '../../message/Message'

class MessageList extends React.Component {
    render() {
        return (
            <div className={classes.MessageList}>
                {this.props.messages.map(message => {
                    return (
                        <Message key={message.id} message={message} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;
