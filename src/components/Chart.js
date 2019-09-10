import React from 'react';
import { withRouter } from 'react-router-dom';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TimerContainer from './TimerContainer';
import NavTabs from './Tabs';

const test = [
  {
    id: 0,
    minutes: 0,
  },
  {
    id: 1,
    minutes: 0,
  },
  {
    id: 2,
    minutes: 0,
  },
  {
    id: 3,
    minutes: 0,
  },
  {
    id: 4,
    minutes: 0,
  },
  {
    id: 5,
    minutes: 0,
  },
  {
    id: 6,
    minutes: 0,
  },
  {
    id: 7,
    minutes: 0,
  },
  {
    id: 8,
    minutes: 0,
  },
  {
    id: 9,
    minutes: 0,
  },
  {
    id: 10,
    minutes: 0,
  },
  {
    id: 11,
    minutes: 0,
  },
  {
    id: 12,
    minutes: 0,
  },
  {
    id: 13,
    minutes: 0,
  },
  {
    id: 14,
    minutes: 0,
  },
  {
    id: 15,
    minutes: 0,
  },
  {
    id: 16,
    minutes: 0,
  },
  {
    id: 17,
    minutes: 0,
  },
  {
    id: 18,
    minutes: 0,
  },
  {
    id: 19,
    minutes: 0,
  },
  {
    id: 20,
    minutes: 0,
  },
  {
    id: 21,
    minutes: 0,
  },
  {
    id: 22,
    minutes: 0,
  },
  {
    id: 23,
    minutes: 0,
  },
];
function Chart(props) {
  const info = props.DataTasks.map((task, index) => {
    const timeStart = new Date(task.time_start);
    const timeEnd = new Date(task.time_end);
    const time = { index, timeStart, timeEnd };
    return time;
  });
  info.map(item => {
    for (let i = 0; i < 24; i++) {
      if (item.timeStart.getHours() === test[i].id) {
        let minutesInHour;
        const hourStart = item.timeStart.getHours();
        const hourEnd = item.timeEnd.getHours();
        const minutesStart = item.timeStart.getMinutes();
        const minutesEnd = item.timeEnd.getMinutes();
        const minutes = Math.floor((item.timeEnd.getTime() - item.timeStart.getTime()) / 60000);
        if (hourStart === hourEnd && minutes < 60) {
          test[i].minutes = test[i].minutes + minutes;

        }
        if (hourStart !== hourEnd && minutes < 60) {
          const minutesInHour = 60 - minutesStart;
          test[i].minutes = test[i].minutes + minutesInHour;
          const minutesLeft = minutes - minutesInHour;
          test[hourEnd].minutes = test[hourEnd].minutes + minutesLeft;
        }
        if (minutes > 60) {
          const minutesInHour = 60 - minutesStart;
          const minutesLeft = minutes - minutesInHour;
          // считаем часы чтобы знать во сколько следующих итераций записать по 60 минут
          const countHour = Math.floor(minutesLeft / 60);
          if (countHour !== 0) {
            for (let j = hourStart + 1; j < j + countHour; j++) {
              if (j > 23) {
                test[j - 23].minutes = 60;
              }
              test[j].minutes = 60;
            }
          }
          test[i].minutes = test[i].minutes + minutesInHour;
          minutesLeft %= 60;
          if (minutesLeft !== 0) {
            test[hourEnd].minutes = test[hourEnd].minutes + minutesLeft;
          }
        }
      }
    }
  });
  console.log(test);

  return (
    <div>
      <TimerContainer />
      <div style={{ width: '1100px', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%' }}>
        <NavTabs />
        <BarChart width={1100} height={250} data={test}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minutes" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default withRouter(Chart);
