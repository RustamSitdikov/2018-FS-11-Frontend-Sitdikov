import React from 'react';
import classes from './ChatsContainer.module.css'
import ChatsBar from '../../components/bars/chats-bar/ChatsBar';
import ChatList from '../../components/lists/chat-list/ChatList';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class ChatsContainer extends React.Component {
    render() {
        const {chats} = this.props;
        return (
            <div className={classes.ChatsContainer}>
                <ChatsBar />
                <ChatList chats={chats}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chatsList.chats
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddChat: (chat) => dispatch(actionCreators.addChat(chat)),
        onDeleteChat: (id) => dispatch(actionCreators.deleteChat(id)),
        onGetChats: () => dispatch(actionCreators.getChats()),
        onUpdateChat: (chat) => dispatch(actionCreators.updateChat(chat))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);
