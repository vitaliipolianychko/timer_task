import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { generateTime, spendTime } from '../helper/functions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5, 40),
    padding: theme.spacing(5, 10),
  },
  but: {
    marginRight: 'auto',
    marginLeft: theme.spacing(2),
  },
  task: {
    margin: theme.spacing(2, 2),
  },
}));

function Task(props) {
  const classes = useStyles();
  const { DataTasks } = props;
  const { id } = props.match.params;
  const dataTasks = DataTasks.map(task => {
    const { tasks } = task;
    const timeStart = generateTime(new Date(task.time_start));
    const timeEnd = generateTime(new Date(task.time_end));
    const timeSpend = spendTime(new Date(task.time_start), new Date(task.time_end));
    const data = { tasks, timeStart, timeEnd, timeSpend };
    return data;
  });

  const res = dataTasks.find((elem, index) => index === id - 1);

  return (
    <Paper className={classes.root}>
      {res !== undefined ? (
        <div>
          <Typography variant="h5" color="primary" className={classes.task}>
            TaskName : {res.tasks}{' '}
          </Typography>
          <Typography component="h6" color="textPrimary" className={classes.task}>
            Time Start : {res.timeStart}{' '}
          </Typography>
          <Typography component="h6" color="textPrimary" className={classes.task}>
            Time Stop : {res.timeEnd}{' '}
          </Typography>
          <Typography component="h6" color="textPrimary" className={classes.task}>
            Time Spend : {res.timeSpend}{' '}
          </Typography>
        </div>
      ) : (
        <Typography variant="h5" color="primary" align="center" className={classes.task}>
          {' '}
          Task with this ID does not exist{' '}
        </Typography>
      )}

      <Link style={{ textDecoration: 'none' }} to="/tasks" className={classes.but}>
        <Button variant="contained"> Go Back </Button>
      </Link>
    </Paper>
  );
}

Task.propTypes = {
  id: PropTypes.number,
  DataTasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
};
Task.defaultProps = {
  id: null,
};

export default Task;
