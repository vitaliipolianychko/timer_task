import React from 'react';
import { withRouter } from 'react-router-dom';
import TimerContainer from './TimerContainer';
import TableContainer from './TableContainer';

function TasksLog() {
  return (
    <div>
      <TimerContainer />
      <TableContainer />
    </div>
  );
}
export default withRouter(TasksLog);
