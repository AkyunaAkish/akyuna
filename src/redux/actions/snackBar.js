import { TOGGLE_SNACKBAR } from './types';

export const toggleSnackbar = (payload) => {
	return {
		type: TOGGLE_SNACKBAR,
		payload
	};
};