import React from 'react';
import classes from './MessageForm.css'

class MessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: {
                text: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            message: {
                id: 3,
                text: event.target.value,
                my: true,
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: {
                text: ''
            }
        })
    }

    render() {
        return (
            <form
                className={classes.MessageForm} onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    value={this.state.message.text}
                    placeholder="Введите сообщение"
                    type="text" />
            </form>
        )
    }
}

export default MessageForm;
