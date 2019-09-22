import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import dataTasksReducer from './dataTasksReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

function logger({ getState }) {
  return next => action => {
    const returnValue = next(action);
    const serialObj = JSON.stringify(getState());
    localStorage.setItem('myKey', serialObj);
    return returnValue;
  };
}

const store = createStore(dataTasksReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
