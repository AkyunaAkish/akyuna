import { UPDATE_DIMENSIONS } from '../actions/types';

let initialState = {
    height: 0,
    width: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_DIMENSIONS:
            return {
                ...state,
                height: action.payload.height,
                width: action.payload.width
            };

        default:
            return state;
    }
}