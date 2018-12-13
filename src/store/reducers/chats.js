import * as actionTypes from '../actions/actionTypes';
import statuses from '../../utils/status/index';
import { updateObject } from '../utility.js';

const initialState = {
    chats: [
        {
            id: 1,
            name: 'Martin',
            icon: '1.png',
            messages: [
                {
                    id: 1,
                    text: 'What\'s up Martin?',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 2,
            name: 'Frontend chat',
            icon: '2.png',
            messages: [
                {
                    id: 1,
                    text: 'I\'m frontend developer',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 3,
            name: 'Minion',
            icon: '3.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 4,
            name: 'Minion',
            icon: '4.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 5,
            name: 'Minion',
            icon: '5.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 6,
            name: 'Minion',
            icon: '6.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 7,
            name: 'Minion',
            icon: '7.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 8,
            name: 'Minion',
            icon: '8.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 9,
            name: 'Minion',
            icon: '9.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        },
        {
            id: 10,
            name: 'Minion',
            icon: '10.png',
            messages: [
                {
                    id: 1,
                    text: 'Hi',
                    date: new Date(),
                    my: false,
                    status: statuses.loaded
                }
            ]
        }
    ]
};

const getChats = ( state, action ) => {
    return state;
};

const addChat = ( state, action ) => {
    const chats = state.chats.slice().push(action.chat);
    return updateObject( state, { chats: chats } );
};

const deleteChat = ( state, action ) => {
    const chats = state.chats.filter( chat => chat.id !== action.id );
    return updateObject( state, { chats: chats } );
};

const updateChat = ( state, action ) => {
    const {chat} = action;
    const chats = state.chats.map(item => item.id === chat.id ? chat : item);
    return updateObject( state, { chats: chats } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_CHATS : return getChats(state, action);
        case actionTypes.ADD_CHAT : return addChat(state, action);
        case actionTypes.DELETE_CHAT : return deleteChat(state, action);
        case actionTypes.UPDATE_CHAT : return updateChat(state, action);
    }
    return state;
};

export default reducer;
