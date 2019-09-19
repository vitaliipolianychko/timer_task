// export const UPDATE_NEW_TASK_TEXT = 'UPDATE-NEW-TASK-TEXT';
export const START = 'START';
export const STOP = 'STOP';
export const DELETE = 'DELETE';
export const GENERATE_TASK = 'GENERATE-TASK';

/* export const onTaskChangeActionCreator = text => {
  return {
    type: UPDATE_NEW_TASK_TEXT,
    updateTask: text,
  };
};
*/

export const startButtonAC = () => {
  return {
    type: START,
  };
};
export const stopButtonAC = TEXT => {
  return {
    type: STOP,
    updateTask: TEXT,
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
