import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TimerContainer from '../Timer/TimerContainer';
import NavTabs from '../Tabs';
import drawChart from '../../helper/funcDataChart';

const useStyles = makeStyles(() => ({
  btnChart: {
    backgroundColor: 'silver',
    marginLeft: '80%',
  },
}));
function Chart(props) {
  const classes = useStyles();
  useEffect(() => {
    const { DataTasks } = props;
    drawChart(DataTasks);
  });
  const generateTasks = () => {
    const { GenerateTasks, DataTasks } = props;
    GenerateTasks();
    drawChart(DataTasks);
  };
  const { DataTasks } = props;
  return (
    <div>
      <TimerContainer />
      <div className="chart-container">
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
          variant="contained"
          className={classes.btnChart}
          onClick={() => {
            generateTasks();
          }}
        >
          Generate Tasks
        </Button>
      </div>
    </div>
  );
}
Chart.propTypes = {
  GenerateTasks: PropTypes.func.isRequired,
  DataTasks: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.string, PropTypes.string])
  ).isRequired,
};

export default withRouter(Chart);
