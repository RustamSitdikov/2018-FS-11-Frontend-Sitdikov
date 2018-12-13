import React from 'react';
import classes from './ChatBar.module.css';

class ChatBar extends React.Component {
    render() {
        return (
            <div className={classes.ChatBar}>
                <svg className={classes.Back}/>
                <div className={classes.Avatar}/>
                <div className={classes.Name}>Martin</div>
                <div className={classes.Search}/>
                <div className={classes.Settings}/>
            </div>
        );
    }
}

export default ChatBar;
