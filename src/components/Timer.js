import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import ButtonTimer from './Button_Timer';
import style from '../style.css';
import Popup from './PopUp'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0,  showModal : false};
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


  onTaskTextChange(event) {
    const { UpdateNewTaskText } = this.props;
    const text = event.target.value;
    UpdateNewTaskText(text);
  }

  increment() {
    const { value } = this.state;
    this.setState({ value: value + 1 });
  }

  startTimer() {
    const { onChangeStartButton } = this.props;
    this.timerID = setInterval(() => this.increment(), 1000);
    onChangeStartButton();
  }

   
     
  togglePopup =() =>{
    this.setState({  
       showModal: !this.state.showModal, 
    }); 
  }

  stopTimer() {
    const { onChangeStopButton, newTaskText } = this.props;
    const text = newTaskText;
    if(text !== '') {
      clearInterval(this.timerID);
      this.setState({
        value: 0,
      });
    }
    else if(text === '') {
     this.togglePopup() ;
    }
    onChangeStopButton();
  }



  render() {
    const { newTaskText, onButton } = this.props;
    const { value } = this.state;
    let hour = Math.floor(value / 60 / 60);
    let minutes = Math.floor(value / 60) % 60;
    let seconds = Math.floor(value) % 60;
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return (
      <div className="container-timer">
        <div>
          <Input
            type="text"
            onChange={this.onTaskTextChange.bind(this)}
            placeholder="Name of your task"
            value={newTaskText}
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
            <ButtonTimer onClick={this.startTimer.bind(this)}>Start</ButtonTimer>
          ) : (
            <ButtonTimer onClick={this.stopTimer.bind(this)}>Stop</ButtonTimer>
          )}
        </div>
        { this.state.showModal ?  
          <Popup  
          closePopup={this.togglePopup}  
          />  
        : null  
        } 
        
      </div>
    );
  }
}
Timer.propTypes = {
  onChangeStartButton: PropTypes.func.isRequired,
  UpdateNewTaskText: PropTypes.func.isRequired,
  newTaskText: PropTypes.string.isRequired,
};

export default Timer;
