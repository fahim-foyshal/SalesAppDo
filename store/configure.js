import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // Corrected import
import rootReducer from '../reducers';

// Apply middleware including thunk
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

export default store;