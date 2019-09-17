const locStorage = JSON.parse(localStorage.getItem('myKey'));
let initialState;
if (!locStorage) {
  initialState = {
    DataTasks: [],
    onButton: true,
    newTaskText: '',
    startTime: null,
    Data: [
      {
        id: 0,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 1,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 2,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 3,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 4,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 5,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 6,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 7,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 8,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 9,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 10,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 11,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 12,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 13,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 14,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 15,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 16,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 17,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 18,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 19,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 20,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 21,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 22,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 23,
        minutes: 0,
        seconds: 0,
      },
    ],
  };
} else {
  initialState = {
    DataTasks: locStorage.DataTasks,
    onButton: locStorage.onButton,
    newTaskText: '',
    startTime: locStorage.startTime,
    Data: [
      {
        id: 0,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 1,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 2,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 3,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 4,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 5,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 6,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 7,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 8,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 9,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 10,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 11,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 12,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 13,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 14,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 15,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 16,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 17,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 18,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 19,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 20,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 21,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 22,
        minutes: 0,
        seconds: 0,
      },
      {
        id: 23,
        minutes: 0,
        seconds: 0,
      },
    ],
  };
}
const dataTasksReducer = (state = initialState, action) => {
  let stateCopy;
  let start;
  let startDate;
  let stop;
  let info;
  switch (action.type) {
    case 'UPDATE-NEW-TASK-TEXT':
      stateCopy = {
        ...state,
      };
      stateCopy.newTaskText = action.updateTask;
      return stateCopy;

    case 'START':
      start = new Date();
      return {
        ...state,
        onButton: !state.onButton,
        startTime: start,
      };

    case 'STOP':
      startDate = new Date(state.startTime);
      stop = new Date();
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
        return stateCopy;
      });
      return stateCopy;

    case 'GENERATE-TASK':
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

    case 'CHART':
      stateCopy = {
        ...state,
        Data: [...state.Data],
      };
      for (let k = 0; k < 24; k += 1) {
        stateCopy.Data[k].minutes = 0;
        stateCopy.Data[k].seconds = 0;
      }
      info = state.DataTasks.map((task, index) => {
        const timeStart = new Date(task.time_start);
        const timeEnd = new Date(task.time_end);
        const time = { index, timeStart, timeEnd };
        return time;
      });
      info.map(item => {
        for (let i = 0; i < 24; i += 1) {
          if (item.timeStart.getHours() === stateCopy.Data[i].id) {
            let secondsInHour;
            const hourStart = item.timeStart.getHours();
            const hourEnd = item.timeEnd.getHours();
            const minutesStart = item.timeStart.getMinutes();
            const secondsStart = item.timeStart.getSeconds() + minutesStart * 60;
            const seconds = (item.timeEnd.getTime() - item.timeStart.getTime()) / 1000;
            const minutes = Math.round((item.timeEnd.getTime() - item.timeStart.getTime()) / 60000);
            if (hourStart === hourEnd && minutes < 60) {
              stateCopy.Data[i].seconds += seconds;
            }
            if (hourStart !== hourEnd && minutes < 60) {
              secondsInHour = 3600 - +secondsStart;
              stateCopy.Data[i].seconds += secondsInHour;
              const secondsLeft = seconds - secondsInHour;
              stateCopy.Data[hourEnd].seconds += secondsLeft;
            }
            if (minutes > 60) {
              secondsInHour = 3600 - secondsStart;
              let secondsLeft = seconds - secondsInHour;
              const countHour = Math.floor(secondsLeft / 3600);

              if (countHour !== 0) {
                const fromm = hourStart + 1;
                const to = fromm + countHour;
                for (let j = fromm; j < to; j += 1) {
                  if (j > 23) {
                    stateCopy.Data[j - 24].seconds = 3600;
                  } else {
                    stateCopy.Data[j].seconds = 3600;
                  }
                }
              }
              stateCopy.Data[i].seconds += secondsInHour;
              secondsLeft %= 3600;
              if (secondsLeft !== 0) {
                stateCopy.Data[hourEnd].seconds += secondsLeft;
              }
            }
          }
        }
        for (let k = 0; k < 24; k += 1) {
          stateCopy.Data[k].minutes = Math.round(stateCopy.Data[k].seconds / 60);
        }
        return stateCopy;
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
export const onGenerateTasks = () => {
  return {
    type: 'GENERATE-TASK',
  };
};
export const onDrawChart = () => {
  return {
    type: 'CHART',
  };
};

export default dataTasksReducer;
