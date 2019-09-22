export const generateTime = param => {
  let hours = param.getHours();
  let minutes = param.getMinutes();
  let seconds = param.getSeconds();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const spendTime = (param1, param2) => {
  const hourStart = param1.getHours();
  const minutesStart = param1.getMinutes();
  const secondsStart = param1.getSeconds();
  const hourStop = param2.getHours();
  const minutesStop = param2.getMinutes();
  const secondsStop = param2.getSeconds();
  let hourSpend = hourStop - hourStart;
  let minutesSpend = minutesStop - minutesStart;
  let secondsSpend = secondsStop - secondsStart;
  if (secondsSpend < 0) {
    secondsSpend += 60;
    minutesSpend -= 1;
  }
  if (minutesSpend < 0) {
    minutesSpend += 60;
    hourSpend -= 1;
  }
  if (hourSpend < 0) {
    hourSpend += 24;
  }
  if (hourSpend < 10) {
    hourSpend = `0${hourSpend}`;
  }
  if (minutesSpend < 10) {
    minutesSpend = `0${minutesSpend}`;
  }
  if (secondsSpend < 10) {
    secondsSpend = `0${secondsSpend}`;
  }
  return `${hourSpend}:${minutesSpend}:${secondsSpend}`;
};

export const randomTime = (min, max) => {
  return (max - min) * Math.random() + min;
};

export const generateTasks = () => {
  const data = [];
  for (let i = 1; i < 15; i += 1) {
    let start = 0;
    let end = 0;
    const minOne = new Date().getTime();
    const maxOne = minOne + 24 * 3600 * 1000;
    start = randomTime(minOne, maxOne);
    end = start + 5400 * 1000;

    const stop = randomTime(start + 600000, end);
    const newTaskData = {
      id: i,
      tasks: `generate task ${i}`,
      timeStart: start,
      timeEnd: stop,
    };
    data.push(newTaskData);
  }
  return data;
};

export const drawChart = param1 => {
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
