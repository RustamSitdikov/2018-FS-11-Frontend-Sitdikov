import * as actionTypes from './actionTypes';

export const getChats = () => {
    return {
        type: actionTypes.GET_CHATS
    };
};

export const addChat = (chat) => {
    return {
        type: actionTypes.ADD_CHAT,
        chat: chat
    };
};

export const deleteChat = (id) => {
    return {
        type: actionTypes.DELETE_CHAT,
        id: id
    };
};

export const updateChat = (chat) => {
    return {
        type: actionTypes.UPDATE_CHAT,
        chat: chat
    };
};

