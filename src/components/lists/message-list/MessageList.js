import React from 'react';
import classes from './MessageList.module.css';
import Message from '../../message/Message';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {messages} = this.props;
        return (
            <div className={classes.MessageList}>
                {messages.map(message => {
                    return (
                        <Message key={message.id} message={message} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;
