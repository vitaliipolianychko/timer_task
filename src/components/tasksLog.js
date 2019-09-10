import React from 'react';
import TimerContainer from './TimerContainer';
import TableContainer from './TableContainer';
import {withRouter} from 'react-router-dom';

function TasksLog() {
  return (
    <div>
      <TimerContainer />
      <TableContainer />
    </div>
  );
}
export default withRouter(TasksLog);
