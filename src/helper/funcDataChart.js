const drawChart = param1 => {
  const data = Array(24)
    .fill({ minutes: 0, seconds: 0 })
    .map((item, index) => ({
      id: index,
      ...item,
    }));
  const info = param1.map((task, index) => {
    const timeStart = new Date(task.timeStart);
    const timeEnd = new Date(task.timeEnd);
    const time = { index, timeStart, timeEnd };
    return time;
  });
  info.forEach(item => {
    for (let i = 0; i < 24; i += 1) {
      if (item.timeStart.getHours() === data[i].id) {
        let secondsInHour;
        const hourStart = item.timeStart.getHours();
        const hourEnd = item.timeEnd.getHours();
        const minutesStart = item.timeStart.getMinutes();
        const secondsStart = item.timeStart.getSeconds() + minutesStart * 60;
        const seconds = (item.timeEnd.getTime() - item.timeStart.getTime()) / 1000;
        const minutes = Math.round((item.timeEnd.getTime() - item.timeStart.getTime()) / 60000);
        if (hourStart === hourEnd && minutes < 60) {
          data[i].seconds += seconds;
        }
        if (hourStart !== hourEnd && minutes < 60) {
          secondsInHour = 3600 - +secondsStart;
          data[i].seconds += secondsInHour;
          const secondsLeft = seconds - secondsInHour;
          data[hourEnd].seconds += secondsLeft;
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
                data[j - 24].seconds = 3600;
              } else {
                data[j].seconds = 3600;
              }
            }
          }
          data[i].seconds += secondsInHour;
          secondsLeft %= 3600;
          if (secondsLeft !== 0) {
            data[hourEnd].seconds += secondsLeft;
          }
        }
      }
    }
    for (let k = 0; k < 24; k += 1) {
      data[k].minutes = Math.round(data[k].seconds / 60);
      data[k].minutes = data[k].minutes > 60 ? 60 : data[k].minutes;
    }
  });

  const resultData = data.map(item => ({
    id: item.id,
    minutes: item.minutes,
  }));
  return resultData;
};

module.exports = drawChart;
