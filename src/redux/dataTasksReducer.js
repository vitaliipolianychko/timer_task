const locStorage = JSON.parse(localStorage.getItem('myKey'));
let initialState;
if (!locStorage) {
  initialState = {
    DataTasks: [],
    onButton: true,
    newTaskText: '',
    startTime: null,
  };
} else {
  initialState = {
    DataTasks: locStorage.DataTasks,
    onButton: locStorage.onButton,
    newTaskText: '',
    startTime: locStorage.startTime,
  };
}
const dataTasksReducer = (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    // case 'NEW-TASK-DATA':

    case 'UPDATE-NEW-TASK-TEXT':
      stateCopy = {
        ...state,
      };
      stateCopy.newTaskText = action.updateTask;
      return stateCopy;

    case 'START':
      const start = new Date();
      return {
        ...state,
        onButton: !state.onButton,
        startTime: start,
      };

    case 'STOP':
      const startDate = new Date(state.startTime);
      const stop = new Date();
      /*
      const hourStart = startDate.getHours();
      const minutesStart = startDate.getMinutes();
      const secondsStart = startDate.getSeconds();
      if (hourStart < 10) {
        hourStart = `0${hourStart}`;
      }
      if (minutesStart < 10) {
        minutesStart = `0${minutesStart}`;
      }
      if (secondsStart < 10) {
        secondsStart = `0${secondsStart}`;
      }
      const startTime = `${hourStart}:${minutesStart}:${secondsStart}`;

      const stop = new Date();
      const hourStop = stop.getHours();
      const minutesStop = stop.getMinutes();
      const secondsStop = stop.getSeconds();
      if (hourStop < 10) {
        hourStop = `0${hourStop}`;
      }
      if (minutesStop < 10) {
        minutesStop = `0${minutesStop}`;
      }
      if (secondsStop < 10) {
        secondsStop = `0${secondsStop}`;
      }
      const stopTime = `${hourStop}:${minutesStop}:${secondsStop}`;

      const hourSpend = hourStop - hourStart;
      const minutesSpend = minutesStop - minutesStart;
      const secondsSpend = secondsStop - secondsStart;
      if (secondsSpend < 0) {
        secondsSpend += 60;
        minutesSpend -= 1;
      }
      if (minutesSpend < 0) {
        minutesSpend += 60;
        hourSpend -= 1;
      }
      if (hourSpend < 0) {
        hourSpend += 24;
      }
      if (hourSpend < 10) {
        hourSpend = `0${hourSpend}`;
      }
      if (minutesSpend < 10) {
        minutesSpend = `0${minutesSpend}`;
      }
      if (secondsSpend < 10) {
        secondsSpend = `0${secondsSpend}`;
      }

      const spendTime = `${hourSpend}:${minutesSpend}:${secondsSpend}`;
      */

      if (state.newTaskText === '') {
        return state;
      }
      if (state.DataTasks.length === 0) {
        const newTaskData = {
          id: 0,
          tasks: state.newTaskText,
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
          tasks: state.newTaskText,
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
      }
      return stateCopy;
    case 'DELETE':
      stateCopy = {
        ...state,
        DataTasks: [...state.DataTasks],
      };
      stateCopy.DataTasks.map((task, index) => {
        if (index === action.taskId) {
          const currentRow = index;
          stateCopy.DataTasks.splice(currentRow, 1);
        }
      });
      return stateCopy;
    default:
      return state;
  }
};

export const onTaskChangeActionCreator = text => {
  return {
    type: 'UPDATE-NEW-TASK-TEXT',
    updateTask: text,
  };
};
export const startButtonAC = () => {
  return {
    type: 'START',
  };
};
export const stopButtonAC = () => {
  return {
    type: 'STOP',
  };
};
export const onDeleteTask = taskId => {
  return {
    type: 'DELETE',
    taskId,
  };
};
export const onInfoTask = taskId => {
  return {
    type: 'INFO',
    taskId,
  };
};

export default dataTasksReducer;
