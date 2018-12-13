import React from 'react';
import classes from './ChatContainer.module.css'
import statuses from '../../utils/status/index'
import MessageList from '../../components/lists/message-list/MessageList';
import MessageForm from '../../components/forms/message-form/MessageForm';
import ChatBar from '../../components/bars/chat-bar/ChatBar'

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: props.chat
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    sendMessage(message) {
        let chat = {...this.state.chat};
        let {messages} = chat;
        messages.push(message);
        chat.messages = messages;
        this.setState({chat: chat});

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
        let chat = {...this.state.chat};
        let {messages} = chat;
        messages.map(item => item.id === message.id ? item.status = statuses.loaded : null);
        chat.messages = messages;
        this.setState({chat: chat});
    }

    render() {
        const {chat} = this.state;
        const {messages} = chat;
        return (
            <div className={classes.ChatContainer}>
                <ChatBar chat={chat}/>
                <MessageList messages={messages} />
                <MessageForm sendMessage={this.sendMessage}/>
            </div>
        );
    }
}

export default ChatContainer;
