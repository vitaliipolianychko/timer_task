import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from './Button_Timer';
import NavTabs from './Tabs';

const StyledTableCell = withStyles(() => ({
  root: {
    color: 'black',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    overflowX: 'auto',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    minWidth: 700,
  },
  backTableRoot: {
    background: 'white',
    color: 'grey',
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();
  const dataTasks = props.DataTasks.map(task => {
    const tasks = task.tasks;
    let timeStart = new Date(task.time_start);
    let timeEnd = new Date(task.time_end);
    let timeSpend = new Date(task.time_spend);
    let hourStart = timeStart.getHours();
    let minutesStart = timeStart.getMinutes();
    let secondsStart = timeStart.getSeconds();
    if (hourStart < 10) {
      hourStart = `0${hourStart}`;
    }
    if (minutesStart < 10) {
      minutesStart = `0${minutesStart}`;
    }
    if (secondsStart < 10) {
      secondsStart = `0${secondsStart}`;
    }
    timeStart = `${hourStart}:${minutesStart}:${secondsStart}`;

    let hourStop = timeEnd.getHours();
    let minutesStop = timeEnd.getMinutes();
    let secondsStop = timeEnd.getSeconds();
    if (hourStop < 10) {
      hourStop = `0${hourStop}`;
    }
    if (minutesStop < 10) {
      minutesStop = `0${minutesStop}`;
    }
    if (secondsStop < 10) {
      secondsStop = `0${secondsStop}`;
    }
    timeEnd = `${hourStop}:${minutesStop}:${secondsStop}`;

    let hourSpend = hourStop - hourStart;
    let minutesSpend = minutesStop - minutesStart;
    let secondsSpend = secondsStop - secondsStart;
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
    timeSpend = `${hourSpend}:${minutesSpend}:${secondsSpend}`;
    const data = { tasks, timeStart, timeEnd, timeSpend };
    return data;
  });
  return (
    <Paper className={classes.root}>
      <NavTabs props={props} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.backTableRoot}>
            <TableCell align="left" variant="head">
              №
            </TableCell>
            <TableCell align="left" variant="head">
              Tasks
            </TableCell>
            <TableCell align="left" variant="head">
              Time start
            </TableCell>
            <TableCell align="left" variant="head">
              Time end
            </TableCell>
            <TableCell align="left" variant="head">
              Time spend
            </TableCell>
            <TableCell align="left" variant="head">
              Info
            </TableCell>
            <TableCell align="left" variant="head">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTasks.map((task, index) => (
            <TableRow key={task.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{task.tasks}</TableCell>
              <TableCell align="left">{task.timeStart}</TableCell>
              <TableCell align="left">{task.timeEnd}</TableCell>
              <TableCell align="left">{task.timeSpend}</TableCell>
              <TableCell align="left">
                {
                  <Link to={`/tasks/${index + 1}`}>
                    <Button align="left">Info </Button>
                  </Link>
                }
              </TableCell>
              <TableCell align="left">
                {
                  <Button
                    onClick={() => {
                      props.DeleteTask(index);
                    }}
                  >
                    {' '}
                    Delete{' '}
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
