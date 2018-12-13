import React from 'react';
import classes from './Chat.module.css';
import { withRouter } from 'react-router-dom';
import getTime from  '../../utils/time/index';
import statuses from '../../utils/status/index';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chat} = this.props;
        const {name, icon} = chat;
        const lastMessage = [...chat.messages].pop();
        return (
            <div className={classes.Chat} onClick={() => {this.props.history.push(`/chats/${chat.id}`)}}>
                <img className={classes.Icon} src={icon}/>
                <div>
                    <div className={classes.Title}>{name}</div>
                    <div className={classes.Message}>{lastMessage.text}</div>
                </div>
                <div className={classes.End}>
                    <div className={classes.Time}>{getTime(lastMessage.date)}</div>
                    {lastMessage.status === statuses.loading ? (
                        <div className={classes.Loading}/>
                    ) : (
                        <div className={classes.Loaded}/>
                    )}
                </div>

            </div>
        );
    }
}

export default withRouter(Chat);
