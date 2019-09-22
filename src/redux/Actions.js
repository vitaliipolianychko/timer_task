export const START = 'START';
export const STOP = 'STOP';
export const DELETE = 'DELETE';
export const GENERATE_TASK = 'GENERATE-TASK';
export const GENERATE_TASK_REQUEST = 'GENERATE-TASK-REQUEST';

export const generateTasksRequest = () => {
  return {
    type: GENERATE_TASK_REQUEST,
  };
};

export const startButtonAC = startTimer => {
  return {
    type: START,
    startTimer,
  };
};
export const stopButtonAC = (TEXT, startTimer, stopTimer) => {
  return {
    type: STOP,
    updateTask: TEXT,
    startTimer,
    stopTimer,
  };
};
export const onDeleteTask = taskId => {
  return {
    type: DELETE,
    taskId,
  };
};
export const onGenerateTasks = data => {
  return {
    type: GENERATE_TASK,
    data,
  };
};
