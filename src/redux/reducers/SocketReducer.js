import { SocketActionTypes } from '../constants/SocketActionTypes';

const initState = {
<<<<<<< HEAD
    socket: undefined,
}; 

export const socketReducer = (state = initState, { type, payload }) => {
=======
    socket: null,
}; 

export const socketsReducer = (state = initState, { type, payload }) => {
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
    switch (type) {
        case SocketActionTypes.SET_SOCKET:
            return { socket: payload };
        default:
            return state;
    }
};