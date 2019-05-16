import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';

const initialStore = {
    chats: {1: {"name": 'chat1', "messageList": [1]} },
    // messageList: [1],
    messages: {1: {sender: 'Robot', text: 'Купи слона!', color: 'default'}},
    nextId: 2,
};


export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const { chats, messages, nextId } = store;
            let chat = chats[1];
            return update(store, {
                chats: { $set: {1: { messageList:[ ...chat.messageList, nextId] }}},
                messages: { $set: { ...messages, [nextId]: { text: action.text, sender: action.sender, color: action.color } } },
                nextId: { $set: nextId + 1 },
            });
        }
        default:
            return store;
    }
}