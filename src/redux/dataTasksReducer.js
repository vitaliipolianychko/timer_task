import { START, STOP, DELETE, GENERATE_TASK /* UPDATE_NEW_TASK_TEXT */ } from './Actions';
import { randomTime } from './generateTime';

const locStorage = JSON.parse(localStorage.getItem('myKey'));
let initialState;
if (!locStorage) {
  initialState = {
    DataTasks: [],
    onButton: true,
    // newTaskText: '',
    startTime: null,
  };
} else {
  initialState = {
    DataTasks: locStorage.DataTasks,
    onButton: locStorage.onButton,
    // newTaskText: '',
    startTime: locStorage.startTime,
  };
}
const dataTasksReducer = (state = initialState, action) => {
  let stateCopy;
  let start;
  let startDate;
  let stop;
  let end;
  switch (action.type) {
    /* case UPDATE_NEW_TASK_TEXT:
      stateCopy = {
        ...state,
      };
      stateCopy.newTaskText = action.updateTask;
      return stateCopy;
      */
    case START:
      start = new Date().getTime();
      return {
        ...state,
        onButton: !state.onButton,
        startTime: start,
      };

    case STOP:
      startDate = new Date(state.startTime).getTime();
      stop = new Date().getTime();

      if (state.DataTasks.length === 0) {
        const newTaskData = {
          id: 0,
          tasks: action.updateTask,
          time_start: startDate,
          time_end: stop,
        };
        stateCopy = {
          ...state,
          DataTasks: [...state.DataTasks, newTaskData],
          onButton: !state.onButton,
          startTime: null,
        };
        stateCopy.newTaskText = '';
      } else {
        const lastElement = state.DataTasks[state.DataTasks.length - 1].id;
        const newTaskData = {
          id: lastElement + 1,
          tasks: action.updateTask,
          time_start: startDate,
          time_end: stop,
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
      stateCopy = {
        ...state,
        DataTasks: [...state.DataTasks],
      };
      stateCopy.DataTasks.map((task, index) => {
        if (index === action.taskId) {
          const currentRow = index;
          stateCopy.DataTasks.splice(currentRow, 1);
        }
        return stateCopy;
      });
      return stateCopy;

    case GENERATE_TASK:
      stateCopy = {
        ...state,
        DataTasks: [...state.DataTasks],
      };
      stateCopy.DataTasks = [];
      for (let i = 1; i < 15; i += 1) {
        start = 0;
        end = 0;
        const min_one = new Date().getTime();
        const max_one = min_one + 24 * 3600 * 1000;
        start = randomTime(min_one, max_one);
        end = start + 5400 * 1000;

        stop = randomTime(start + 600000, end);
        const newTaskData = {
          id: i,
          tasks: `generate task ${i}`,
          time_start: start,
          time_end: stop,
        };
        stateCopy.DataTasks.push(newTaskData);
      }

      return stateCopy;

    default:
      return state;
  }
};

export default dataTasksReducer;
