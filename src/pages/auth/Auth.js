import React from 'react';
import classes from './Auth.module.css';
import colors from '../../utils/colors';

import { ReactComponent as Facebook } from '../../assets/auth/facebook.svg';
import { ReactComponent as Google } from '../../assets/auth/google.svg';
import { ReactComponent as Twoitter } from '../../assets/auth/twitter.svg';

let style = {
    backgroundColor: colors.purple
};

class Auth extends React.Component {
    onClick = () => { this.props.history.push('/chats/') };
    render() {
        return (
            <div className={classes.Auth} style={style}>
                <div className={classes.Title}>Messenger</div>
                <Facebook className={classes.Item} onClick={this.onClick}/>
                <Google className={classes.Item} onClick={this.onClick}/>
                <Twoitter className={classes.Item} onClick={this.onClick}/>
            </div>
        );
    }
}

export default Auth;