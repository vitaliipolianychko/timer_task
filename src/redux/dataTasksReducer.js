import { START, STOP, DELETE, GENERATE_TASK /* UPDATE_NEW_TASK_TEXT */ } from './Actions';

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
  switch (action.type) {
    /* case UPDATE_NEW_TASK_TEXT:
      stateCopy = {
        ...state,
      };
      stateCopy.newTaskText = action.updateTask;
      return stateCopy;
      */
    case START:
      start = new Date();
      return {
        ...state,
        onButton: !state.onButton,
        startTime: start,
      };

    case STOP:
      startDate = new Date(state.startTime);
      stop = new Date();

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
      for (let i = 10; i < 21; i += 1) {
        const newTaskData = {
          id: i,
          tasks: `generate task ${i}`,
          time_start: `2019-09-13T${i}:${i}:00.759Z`,
          time_end: `2019-09-13T${i}:49:00.647Z`,
        };
        stateCopy.DataTasks.push(newTaskData);
      }

      return stateCopy;

    default:
      return state;
  }
};

export default dataTasksReducer;
