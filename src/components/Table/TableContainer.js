import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomizedTables from './Table';
import { onDeleteTask } from '../../redux/Actions';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    DeleteTask: taskId => {
      dispatch(onDeleteTask(taskId));
    },
  };
};

const TableContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomizedTables)
);

export default TableContainer;
