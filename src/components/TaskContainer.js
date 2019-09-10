import { connect } from 'react-redux';
import Task from './Task';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
  };
};

const TaskContainer = connect(mapStateToProps)(Task);

export default withRouter(TaskContainer);
