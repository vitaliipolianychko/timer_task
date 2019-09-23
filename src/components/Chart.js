import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import TimerContainer from './TimerContainer';
import NavTabs from './Tabs';
import Button from './Button_Timer';
import drawChart from '../helper/funcDataChart';

class Chart extends Component {
  componentDidMount() {
    const { DataTasks } = this.props;
    drawChart(DataTasks);
  }

  generateTasks = () => {
    const { GenerateTasks, DataTasks } = this.props;
    GenerateTasks();
    drawChart(DataTasks);
  };

  render() {
    const { DataTasks } = this.props;
    return (
      <div>
        <TimerContainer />
        <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%', padding: '0' }}>
          <NavTabs />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={drawChart(DataTasks)} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend align="center" />
              <Bar name="Minutes in hour" dataKey="minutes" fill="#3F51B5" />
            </BarChart>
          </ResponsiveContainer>

          <Button
            style={{ backgroundColor: 'silver', marginLeft: '80%' }}
            onClick={() => {
              this.generateTasks();
            }}
          >
            Generate Tasks
          </Button>
        </div>
      </div>
    );
  }
}
Chart.propTypes = {
  GenerateTasks: PropTypes.func.isRequired,
  DataTasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
};

export default withRouter(Chart);
