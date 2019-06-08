import reducer from './rootReducer';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

const configureStore = () => {
  // Create store template with redux-promise middle to resolve unfinished promises before sending action.payload to reducers
  const createStoreWithMiddleware = applyMiddleware(thunk, promise)(
    createStore
  );

  // create store and enable redux chrome extension
  const store = createStoreWithMiddleware(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  // uncomment for hot module replacement
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  window.store = store;
  return store;
};

export default configureStore;
