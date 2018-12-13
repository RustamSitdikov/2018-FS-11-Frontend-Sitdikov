import React from 'react';
import classes from './ChatsBar.module.css';

class ChatsBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classes.ChatsBar}>
                <div className={classes.Burger}/>
                <div className={classes.Title}>Messenger</div>
                <div className={classes.Search}/>
            </div>
        );
    }
}

export default ChatsBar;
