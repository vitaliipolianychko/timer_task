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
