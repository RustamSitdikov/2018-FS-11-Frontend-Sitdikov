import React from 'react';
import classes from './Chat.module.css'
import statuses from '../../utils/status/index'
import MessageList from '../../components/lists/message-list/MessageList';
import MessageForm from '../../components/forms/message-form/MessageForm';
import ChatBar from '../../components/bars/chat-bar/ChatBar'

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {
                    id: 1,
                    text: 'What\'s up Martin?',
                    time: new Date(),
                    my: false,
                },
                {
                    id: 2,
                    text: 'What\'s up Martin?',
                    time: new Date(),
                    my: false,
                },
                {
                    id: 3,
                    text: 'I\'m fine bro!',
                    time: new Date(),
                    my: true,
                    status: statuses.loading
                },
                {
                    id: 4,
                    text: 'I\'m fine bro!',
                    time: new Date(),
                    my: true,
                    status: statuses.loading
                }
            ]
        };
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(message) {
        const messages = this.state.messages.slice();
        messages.push(message);
        this.setState({
            messages: messages,
        });
    }

    render() {
        return (
            <div className={classes.Chat}>
                <ChatBar/>
                <MessageList messages={this.state.messages} />
                <MessageForm sendMessage={this.sendMessage}/>
            </div>
        );
    }
}

export default Chat;
