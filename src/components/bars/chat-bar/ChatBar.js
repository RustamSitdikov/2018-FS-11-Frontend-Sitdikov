import React from 'react';
import classes from './ChatBar.module.css';
import { withRouter } from 'react-router-dom';

class ChatBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chat} = this.props;
        const {name, icon} = chat;
        return (
            <div className={classes.ChatBar}>
                <div className={classes.Back} onClick={() => {this.props.history.push('/chats/')}}/>
                <img className={classes.Icon} src={icon}/>
                <div className={classes.Title}>{name}</div>
                <div className={classes.Search}/>
                <div className={classes.Settings}/>
            </div>
        );
    }
}

export default withRouter(ChatBar);
