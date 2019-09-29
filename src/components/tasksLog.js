import React from 'react';
import { withRouter } from 'react-router-dom';
import TimerContainer from './Timer/TimerContainer';
import TableContainer from './Table/TableContainer';

function TasksLog() {
  return (
    <div>
      <TimerContainer />
      <TableContainer />
    </div>
  );
}
export default withRouter(TasksLog);
