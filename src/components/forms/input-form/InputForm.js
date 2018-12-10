import React from 'react';
import classes from './InputForm.module.css'

class InputForm extends React.Component {
    render() {
        return (
            <input className={classes.Input} {...this.props} placeholder="Введите сообщение" type='text'/>
        )
    }
}

export default InputForm;

