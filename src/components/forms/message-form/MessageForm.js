import React from 'react';
import statuses from '../../../utils/status/index';
import classes from './MessageForm.module.css';
import InputForm from '../input-form/InputForm';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: { text: '' }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    createMessage(text, attach) {
        return {
            id: Math.round(new Date().getTime() + (Math.random() * 100)),
            text: text,
            attach: attach,
            date: new Date(),
            my: true,
            status: statuses.loading,
        }
    }

    handleChange(event) {
        const message = this.createMessage(event.target.value, null);
        this.setState({
            message: message
        })
    }

    handleSubmit(event) {
        const {message} = this.state;
        if (message.text.length > 0) {
            event.preventDefault();
            this.props.sendMessage(message);
            this.setState({
                message: { text: '' }
            })
        }
    }

    handleFile(event) {
        const message = this.createMessage('', event.target.files[0]);
        this.props.sendMessage(message);
    }

    render() {
        const {message} = this.state;
        const {text} = message;
        const isTyping = text.length > 0;
        return (
            <form className={classes.MessageForm} onSubmit={this.handleSubmit}>
                <InputForm onChange={this.handleChange} value={text}/>
                {isTyping ? (
                    <label className={classes.SendForm} onClick={this.handleSubmit}/>
                ) : (
                    <div className={classes.FileForm} onClick={() => {this.inputFile.click()}}>
                        <input className={classes.FileInput} type='file' multiple
                               ref={input=>this.inputFile=input}
                               onChange={this.handleFile}/>
                    </div>
                )}
            </form>
        )
    }
}

export default MessageForm;
