import React from 'react';
import classes from './Chat.css'
import MessageList from "../../components/lists/message-list/MessageList";
import MessageForm from "../../components/forms/message-form/MessageForm";
import ChatBar from "../../components/bars/chat-bar/ChatBar"

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {
                    id: 1,
                    text: 'What\'s up Martin?',
                    my: false,
                },
                {
                    id: 2,
                    text: 'I\'m fine bro!',
                    my: true,
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
                <MessageForm onSubmit={this.sendMessage}/>
            </div>
        );
    }
}

export default Chat;
