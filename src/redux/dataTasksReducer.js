import { START, STOP, DELETE, GENERATE_TASK } from './Actions';

const locStorage = JSON.parse(localStorage.getItem('myKey'));
let initialState;
if (!locStorage) {
  initialState = {
    DataTasks: [],
    onButton: true,
    startTime: null,
  };
} else {
  initialState = {
    DataTasks: locStorage.DataTasks,
    onButton: locStorage.onButton,
    startTime: locStorage.startTime,
  };
}
const dataTasksReducer = (state = initialState, action) => {
  let stateCopy;
  let start = 0;
  let startDate;
  let stop;
  switch (action.type) {
    case START:
      start = action.startTimer;
      return {
        ...state,
        onButton: !state.onButton,
        startTime: start,
      };
    case STOP:
      startDate = action.startTimer;
      stop = action.stopTimer;
      if (state.DataTasks.length === 0) {
        const newTaskData = {
          id: 0,
          tasks: action.updateTask,
          timeStart: startDate,
          timeEnd: stop,
        };
        stateCopy = {
          ...state,
          DataTasks: [...state.DataTasks, newTaskData],
          onButton: !state.onButton,
          startTime: null,
        };
      } else {
        const lastElement = state.DataTasks[state.DataTasks.length - 1].id;
        const newTaskData = {
          id: lastElement + 1,
          tasks: action.updateTask,
          timeStart: startDate,
          timeEnd: stop,
        };
        stateCopy = {
          ...state,
          DataTasks: [...state.DataTasks, newTaskData],
          onButton: !state.onButton,
          startTime: null,
        };
      }
      return stateCopy;
    case DELETE:
      return {
        ...state,
        DataTasks: state.DataTasks.filter((task, index) => index !== action.taskId),
      };

    case GENERATE_TASK:
      stateCopy = {
        ...state,
        DataTasks: [...state.DataTasks],
      };
      stateCopy.DataTasks = [];
      return {
        ...state,
        DataTasks: action.data,
      };

    default:
      return state;
  }
};

export default dataTasksReducer;
