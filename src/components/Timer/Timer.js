import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// eslint-disable-next-line no-unused-vars
import style from '../../style.css';

const useStyles = makeStyles(() => ({
  btnTimer: {
    marginLeft: '30%',
  },
}));

function Timer(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const timerID = useRef();
  const increment = () => {
    setValue(prevState => prevState + 1);
  };
  useEffect(() => {
    const { onButton, startTime } = props;
    const TimeStart = new Date(startTime).getTime();
    const dateNow = new Date().getTime();
    const spend = dateNow - TimeStart;
    const spendSeconds = spend / 1000;
    setValue(spendSeconds);
    if (!onButton) {
      timerID.current = setInterval(() => {
        increment();
      }, 1000);
    }
    if (onButton) {
      setValue(0);
    }
    return () => {
      clearInterval(timerID.current);
    };
  }, [props]);

  const onTaskTextChange = event => {
    setText(event.target.value);
  };

  const togglePopup = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const startTimer = () => {
    const { onChangeStartButton } = props;
    const onStartTimer = new Date().getTime();
    timerID.current = setInterval(() => {
      increment();
    }, 1000);
    onChangeStartButton(onStartTimer);
  };

  const stopTimer = () => {
    const { onChangeStopButton, startTime } = props;
    const onStartTimer = new Date(startTime).getTime();
    const onStopTimer = new Date().getTime();
    if (text !== '') {
      clearInterval(timerID.current);
      setValue(0);
      onChangeStopButton(text, onStartTimer, onStopTimer);
      setText('');
    } else if (text === '') {
      togglePopup();
    }
  };

  const { onButton } = props;
  let hour = Math.floor(value / 60 / 60);
  let minutes = Math.floor(value / 60) % 60;
  let seconds = Math.floor(value) % 60;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className="container-timer">
      <div>
        <Input
          type="text"
          onChange={onTaskTextChange}
          value={text}
          placeholder="Name of your task"
          className="margin-input"
        />
      </div>
      <div className="circle">
        <p className="counter-timer">
          <span>{hour} : </span>
          <span>{minutes} : </span>
          <span>{seconds} </span>
        </p>
      </div>
      <div>
        {onButton ? (
          <Button variant="contained" className={classes.btnTimer} onClick={startTimer}>
            Start
          </Button>
        ) : (
          <Button variant="contained" className={classes.btnTimer} onClick={stopTimer}>
            Stop
          </Button>
        )}
      </div>
      {showModal ? (
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Empty task name</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are trying close your task without name, enter the title and try again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}
Timer.propTypes = {
  onChangeStartButton: PropTypes.func.isRequired,
  onChangeStopButton: PropTypes.func.isRequired,
  onButton: PropTypes.bool.isRequired,
  startTime: PropTypes.instanceOf(Date),
};
Timer.defaultProps = {
  startTime: null,
};
export default Timer;
