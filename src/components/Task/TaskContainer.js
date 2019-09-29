import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Task from './Task';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
  };
};

const TaskContainer = connect(mapStateToProps)(Task);

export default withRouter(TaskContainer);
