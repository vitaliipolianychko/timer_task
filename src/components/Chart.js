import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import TimerContainer from './TimerContainer';
import NavTabs from './Tabs';
import Button from './Button_Timer';

class Chart extends Component {
  componentDidMount() {
    const { drawChart } = this.props;
    drawChart();
  }

  generateTasks = () => {
    const { drawChart, GenerateTasks } = this.props;
    GenerateTasks();
    drawChart();
  };

  render() {
    const { Data } = this.props;
    return (
      <div>
        <TimerContainer />
        <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%', padding: '0' }}>
          <NavTabs />
          <BarChart width={950} height={250} data={Data} margin={{ top: 10, right: 5, bottom: 10, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend align="center" />
            <Bar name="Minutes in hour" dataKey="minutes" fill="#3F51B5" />
          </BarChart>

          <Button
            style={{ marginTop: '10px', backgroundColor: 'silver', marginLeft: '80%' }}
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
  drawChart: PropTypes.func.isRequired,
  GenerateTasks: PropTypes.func.isRequired,
  Data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.number, PropTypes.number]))
    .isRequired,
};

export default withRouter(Chart);
