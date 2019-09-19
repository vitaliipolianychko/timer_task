import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chart from './Chart';
import { onGenerateTasks } from '../redux/Actions';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    GenerateTasks: () => {
      dispatch(onGenerateTasks());
    },
  };
};

const ChartContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chart)
);

export default ChartContainer;
