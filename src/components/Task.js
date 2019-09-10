import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    margin : theme.spacing(5,40),
    padding : theme.spacing(5,10),
  },
  but: {
    margin : theme.spacing(5,20),
  },
  task: {
    margin : theme.spacing(2,2),
  },
}));

 function Task(props) {
  const classes = useStyles();
  const { id } = props.match.params;
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

  const res = dataTasks.find((elem, index) => index === id-1)
  console.log(res)


  return (

          <Paper className={classes.root}>
            { res !== undefined ? (
            <div>
              <Typography variant="h5" color ="primary" className ={classes.task}>TaskName : {res.tasks} </Typography>
              <Typography component="h6" color ="textPrimary" className ={classes.task} >Time Start : {res.timeStart} </Typography>
              <Typography component="h6" color ="textPrimary" className ={classes.task}>Time Stop : {res.timeEnd} </Typography>
              <Typography component="h6" color ="textPrimary" className ={classes.task}>Time Spend : {res.timeSpend} </Typography>
            </div>
            )
            :
            (
              <Typography variant="h5" color ="primary" align="center" className ={classes.task}> Task with this ID doen't exist </Typography>
            ) 
            }

            <Link to="/tasks" className= {classes.but}>
              <Button variant="contained"> Go Back </Button>
            </Link>

          </Paper>
  );
}

export default Task;
