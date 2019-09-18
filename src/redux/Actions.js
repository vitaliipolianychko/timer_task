export const UPDATE_NEW_TASK_TEXT = 'UPDATE-NEW-TASK-TEXT';
export const START = 'START';
export const STOP = 'STOP';
export const DELETE = 'DELETE';
export const GENERATE_TASK = 'GENERATE-TASK';
export const CHART = 'CHART';

export const onTaskChangeActionCreator = text => {
  return {
    type: UPDATE_NEW_TASK_TEXT,
    updateTask: text,
  };
};
export const startButtonAC = () => {
  return {
    type: START,
  };
};
export const stopButtonAC = () => {
  return {
    type: STOP,
  };
};
export const onDeleteTask = taskId => {
  return {
    type: DELETE,
    taskId,
  };
};
export const onGenerateTasks = () => {
  return {
    type: GENERATE_TASK,
  };
};
export const onDrawChart = () => {
  return {
    type: CHART,
  };
};
