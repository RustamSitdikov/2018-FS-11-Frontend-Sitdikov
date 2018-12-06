import React from 'react';
// import classes from './Message.css'

class Message extends React.Component {
    render() {
        const message = this.props.message;
        return (
            <div>
                {message.text}
            </div>
        );
    }
}

export default Message;
