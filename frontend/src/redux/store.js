import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from './reducer/user';

const reducers = combineReducers({
  user,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
