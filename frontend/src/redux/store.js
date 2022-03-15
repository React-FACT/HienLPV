import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import user from './reducer/user';
import { mySaga } from '../saga';

const reducers = combineReducers({
  user,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export default store;
