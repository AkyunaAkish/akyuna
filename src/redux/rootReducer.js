import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import socketReducer from './reducers/socket';
import dimensionsReducer from './reducers/dimensions';
import snackBarReducer from './reducers/snackBar';

const rootReducer = combineReducers({
	form: formReducer,
	socket: socketReducer,
	dimensions: dimensionsReducer,
	snackBar: snackBarReducer,
});

export default rootReducer;
