import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button_Timer';
import NavTabs from './Tabs';
import { generateTime, spendTime } from '../redux/generateTime';

const useStyles = makeStyles(() => ({
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
    color: 'silver',
  },
}));

export default function CustomizedTables(props) {
  const { DataTasks, DeleteTask } = props;
  const classes = useStyles();
  const dataTasks = DataTasks.map(task => {
    const { tasks } = task;
    const timeStart = generateTime(new Date(task.time_start));
    const timeEnd = generateTime(new Date(task.time_end));
    const timeSpend = spendTime(new Date(task.time_start), new Date(task.time_end));
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
                  <Link style={{ textDecoration: 'none' }} to={`/tasks/${index + 1}`}>
                    <Button align="left">Info </Button>
                  </Link>
                }
              </TableCell>
              <TableCell align="left">
                {
                  <Button
                    onClick={() => {
                      DeleteTask(index);
                    }}
                  >
                    Delete
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
CustomizedTables.propTypes = {
  DataTasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
  DeleteTask: PropTypes.func.isRequired,
};
