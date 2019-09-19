import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import TimerContainer from './TimerContainer';
import NavTabs from './Tabs';
import Button from './Button_Timer';

let Data = [];

class Chart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  componentWillUnmount() {
    Data = [];
  }

  createData = () => {
    for (let k = 0; k < 24; k += 1) {
      Data.push({ id: k, minutes: 0, seconds: 0 });
    }
  };

  drawChart = () => {
    this.createData();
    const { DataTasks } = this.props;
    for (let k = 0; k < 24; k += 1) {
      Data[k].minutes = 0;
      Data[k].seconds = 0;
    }
    const info = DataTasks.map((task, index) => {
      const timeStart = new Date(task.time_start);
      const timeEnd = new Date(task.time_end);
      const time = { index, timeStart, timeEnd };
      return time;
    });
    info.map(item => {
      for (let i = 0; i < 24; i += 1) {
        if (item.timeStart.getHours() === Data[i].id) {
          let secondsInHour;
          const hourStart = item.timeStart.getHours();
          const hourEnd = item.timeEnd.getHours();
          const minutesStart = item.timeStart.getMinutes();
          const secondsStart = item.timeStart.getSeconds() + minutesStart * 60;
          const seconds = (item.timeEnd.getTime() - item.timeStart.getTime()) / 1000;
          const minutes = Math.round((item.timeEnd.getTime() - item.timeStart.getTime()) / 60000);
          if (hourStart === hourEnd && minutes < 60) {
            Data[i].seconds += seconds;
          }
          if (hourStart !== hourEnd && minutes < 60) {
            secondsInHour = 3600 - +secondsStart;
            Data[i].seconds += secondsInHour;
            const secondsLeft = seconds - secondsInHour;
            Data[hourEnd].seconds += secondsLeft;
          }
          if (minutes > 60) {
            secondsInHour = 3600 - secondsStart;
            let secondsLeft = seconds - secondsInHour;
            const countHour = Math.floor(secondsLeft / 3600);

            if (countHour !== 0) {
              const fromm = hourStart + 1;
              const to = fromm + countHour;
              for (let j = fromm; j < to; j += 1) {
                if (j > 23) {
                  Data[j - 24].seconds = 3600;
                } else {
                  Data[j].seconds = 3600;
                }
              }
            }
            Data[i].seconds += secondsInHour;
            secondsLeft %= 3600;
            if (secondsLeft !== 0) {
              Data[hourEnd].seconds += secondsLeft;
            }
          }
        }
      }
      for (let k = 0; k < 24; k += 1) {
        Data[k].minutes = Math.round(Data[k].seconds / 60);
      }
      return Data;
    });
    return Data;
  };

  generateTasks = () => {
    const { GenerateTasks } = this.props;
    GenerateTasks();
    this.drawChart();
  };

  render() {
    return (
      <div>
        <TimerContainer />
        <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%', padding: '0' }}>
          <NavTabs />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={Data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Legend align="center" />
              <Bar name="Minutes in hour" dataKey="minutes" fill="#3F51B5" />
            </BarChart>
          </ResponsiveContainer>

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
  GenerateTasks: PropTypes.func.isRequired,
  DataTasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
};

export default withRouter(Chart);
