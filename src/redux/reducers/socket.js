import { SET_SOCKET } from '../actions/types';

let initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SOCKET:
            return action.payload;

        default:
            return state;
    }
}