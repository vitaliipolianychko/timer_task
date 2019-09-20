import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonTimer from './Button_Timer';
// eslint-disable-next-line no-unused-vars
import style from '../style.css';

let TEXT = '';
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, showModal: false };
    this.newTask = React.createRef();
  }

  componentDidMount() {
    const { onButton, startTime } = this.props;
    const TimeStart = new Date(startTime).getTime();
    const dateNow = new Date().getTime();
    const spend = dateNow - TimeStart;
    const spendSeconds = spend / 1000;
    this.setState({ value: spendSeconds });
    if (!onButton) {
      this.timerID = setInterval(() => this.increment(), 1000);
    }
    if (onButton) {
      this.setState({ value: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /* onTaskTextChange = event => {
    const { UpdateNewTaskText } = this.props;
    const text = event.target.value;
    UpdateNewTaskText(text);
  };
  */

  onTaskTextChange = event => {
    TEXT = event.target.value;
    return TEXT;
  };

  togglePopup = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  onClose = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  startTimer = () => {
    const { onChangeStartButton } = this.props;
    this.timerID = setInterval(() => this.increment(), 1000);
    onChangeStartButton();
  };

  increment = () => {
    const { value } = this.state;
    this.setState({ value: value + 1 });
  };

  stopTimer = () => {
    const { onChangeStopButton /* newTaskText */ } = this.props;

    if (TEXT !== '') {
      clearInterval(this.timerID);
      this.setState({
        value: 0,
      });
      onChangeStopButton(TEXT);
      TEXT = '';
    } else if (TEXT === '') {
      this.togglePopup();
    }
  };

  render() {
    const { /* newTaskText, */ onButton } = this.props;
    const { value, showModal } = this.state;
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
            onChange={this.onTaskTextChange}
            value={TEXT}
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
            <ButtonTimer style={{ marginLeft: '30%' }} onClick={this.startTimer}>
              Start
            </ButtonTimer>
          ) : (
            <ButtonTimer style={{ marginLeft: '30%' }} onClick={this.stopTimer}>
              Stop
            </ButtonTimer>
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
              <Button onClick={this.onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>
    );
  }
}
Timer.propTypes = {
  onChangeStartButton: PropTypes.func.isRequired,
  onChangeStopButton: PropTypes.func.isRequired,
  // UpdateNewTaskText: PropTypes.func.isRequired,
  // newTaskText: PropTypes.string.isRequired,
  onButton: PropTypes.bool.isRequired,
  startTime: PropTypes.instanceOf(Date),
};
Timer.defaultProps = {
  startTime: null,
};
export default Timer;
