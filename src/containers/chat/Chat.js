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
                }
            ]
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    sendMessage(message) {
        let {messages} = this.state;
        messages.push(message);
        this.setState({ messages: messages});

        fetch('http://localhost:8090/message', {
            method: 'POST',
            body: Object.keys(message).reduce((formData, key) => {
                if (message[key]) formData.append(key, message[key]);
                return formData;
            }, new FormData()),
        }).then((response) => {
            if (response.ok) {
                message.status = statuses.loaded;
                this.updateMessage(message);
            }
        });
    }

    updateMessage(message) {
        let {messages} = this.state;
        messages.map(item => item.id === message.id ? item.status = statuses.loaded : null);
        this.setState({ messages: messages});
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
