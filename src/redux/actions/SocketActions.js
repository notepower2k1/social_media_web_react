import { SocketActionTypes } from '../constants/SocketActionTypes';

export const setSocket = (post) => {
    return {
        type: SocketActionTypes.SET_SOCKET,
        payload: post
    };
};