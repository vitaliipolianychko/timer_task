import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chart from './Chart';

const mapStateToProps = state => {
  return {
    DataTasks: state.DataTasks,
  };
};

const ChartContainer = withRouter(connect(mapStateToProps)(Chart));

export default ChartContainer;
