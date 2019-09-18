import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chart from './Chart';
import { onGenerateTasks, onDrawChart } from '../redux/Actions';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
    Data: state.Data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    GenerateTasks: () => {
      dispatch(onGenerateTasks());
    },
    drawChart: () => {
      dispatch(onDrawChart());
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
