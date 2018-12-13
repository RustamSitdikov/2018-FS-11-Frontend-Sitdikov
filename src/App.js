import React from 'react';
import ChatsContainer from './containers/chats-container/ChatsContainer';
import ChatContainer from './containers/chat-container/ChatContainer';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        let routes = (
            <Switch>
                <Route exact path='/' render={() => (<Redirect to='/chats' />)} />
                <Route path='/chats/:id' render={(props) => <ChatContainer chat={this.props.chats[props.match.params.id]} />}/>
                <Route path='/chats/' component={ChatsContainer} />
            </Switch>
        );
        return (
            <Router>
                {routes}
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chatsList.chats
    }
};

export default connect(mapStateToProps)(App)
