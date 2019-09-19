import { connect } from 'react-redux';
import Timer from './Timer';
import { /*onTaskChangeActionCreator,*/ startButtonAC, stopButtonAC } from '../redux/Actions';

const mapStateToProps = state => {
  return {
    // newTaskText: state.newTaskText,
    onButton: state.onButton,
    startTime: state.startTime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*UpdateNewTaskText: text => {
      dispatch(onTaskChangeActionCreator(text));
    },
    */
    onChangeStartButton: () => {
      dispatch(startButtonAC());
    },
    onChangeStopButton: TEXT => {
      dispatch(stopButtonAC(TEXT));
    },
  };
};

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default TimerContainer;
