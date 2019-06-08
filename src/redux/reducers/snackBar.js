import React from 'react';

import { TOGGLE_SNACKBAR } from '../actions/types';

const initialState = {
	snackbarOpen: false,
	snackbarVariant: 'success', // success || error || warning
	snackbarAutoHideDuration: 5000, // milliseconds
	snackbarContent: <React.Fragment />
};

export default function(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SNACKBAR:
			// action payload should be an object with the 
			// key/values that are needing to be overridden in the state
			return { 
				...state, 
				...action.payload 
			};

		default:
			return state;
	}
}
