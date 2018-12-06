import React from 'react';
import classes from './App.css';
import Chat from './containers/chat/Chat'

class App extends React.Component {
    render() {
        return (
            <div className={classes.App}>
                <Chat/>
            </div>
        );
    }
}

export default App;
