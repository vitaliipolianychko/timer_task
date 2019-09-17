import { createStore, applyMiddleware } from 'redux';
import dataTasksReducer from './dataTasksReducer';

function logger({ getState }) {
  return next => action => {
    const returnValue = next(action);
    const serialObj = JSON.stringify(getState());
    localStorage.setItem('myKey', serialObj);
    return returnValue;
  };
}

const store = createStore(dataTasksReducer, applyMiddleware(logger));

export default store;
