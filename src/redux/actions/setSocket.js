import { SET_SOCKET } from './types';

export default function (socket) {
    return {
        type: SET_SOCKET, 
        payload: socket
    };
};