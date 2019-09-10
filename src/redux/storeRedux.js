import { createStore, applyMiddleware } from 'redux';
import dataTasksReducer from './dataTasksReducer';

function logger({ getState }) {
  return next => action => {
    //console.log('will dispatch', action);

    const returnValue = next(action);
    let serialObj = JSON.stringify(getState()); // сериализуем его

    localStorage.setItem('myKey', serialObj); // запишем его в хранилище по ключу "myKey"


    return returnValue;
  };
}

const store = createStore(dataTasksReducer, applyMiddleware(logger));

export default store;
