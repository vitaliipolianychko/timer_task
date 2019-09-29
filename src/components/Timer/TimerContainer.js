import { connect } from 'react-redux';
import Timer from './Timer';
import { startButtonAC, stopButtonAC } from '../../redux/Actions';

const mapStateToProps = state => {
  return {
    onButton: state.onButton,
    startTime: state.startTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeStartButton: startTimer => {
      dispatch(startButtonAC(startTimer));
    },
    onChangeStopButton: (TEXT, startTimer, stopTimer) => {
      dispatch(stopButtonAC(TEXT, startTimer, stopTimer));
    },
  };
};

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default TimerContainer;
