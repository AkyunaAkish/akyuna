import { UPDATE_DIMENSIONS } from './types';

export default function (dimensions) {
    return {
        type: UPDATE_DIMENSIONS,
        payload: dimensions
    };
};