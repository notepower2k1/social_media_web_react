<<<<<<< HEAD
import { SocketActionTypes } from '../constants/SocketActionTypes';

export const setSocket = (post) => {
    return {
        type: SocketActionTypes.SET_SOCKET,
        payload: post
=======
import SocketActionTypes from '../constants/SocketActionTypes';

export const setSocket = (socket) => {
    return {
        type: SocketActionTypes.SET_SOCKET,
        payload: socket
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    };
};