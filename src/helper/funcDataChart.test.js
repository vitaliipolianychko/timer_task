const drawChart = require('./funcDataChart');

const dataTest = [
  {
    id: 1,
    tasks: 'generate task 1',
    timeEnd: new Date().setHours(7, 10, 0),
    timeStart: new Date().setHours(6, 0, 0),
  },
  {
    id: 2,
    tasks: 'generate task 2',
    timeEnd: new Date().setHours(14, 20, 50),
    timeStart: new Date().setHours(12, 30, 20),
  },
  {
    id: 3,
    tasks: 'generate task 3',
    timeEnd: new Date().setHours(18, 0, 0),
    timeStart: new Date().setHours(17, 5, 0),
  },
  {
    id: 4,
    tasks: 'generate task 4',
    timeEnd: new Date().setHours(2, 50, 0),
    timeStart: new Date().setHours(2, 10, 0),
  },
];

const resultTest = [
  { id: 0, minutes: 0 },
  { id: 1, minutes: 0 },
  { id: 2, minutes: 40 },
  { id: 3, minutes: 0 },
  { id: 4, minutes: 0 },
  { id: 5, minutes: 0 },
  { id: 6, minutes: 60 },
  { id: 7, minutes: 10 },
  { id: 8, minutes: 0 },
  { id: 9, minutes: 0 },
  { id: 10, minutes: 0 },
  { id: 11, minutes: 0 },
  { id: 12, minutes: 30 },
  { id: 13, minutes: 60 },
  { id: 14, minutes: 21 },
  { id: 15, minutes: 0 },
  { id: 16, minutes: 0 },
  { id: 17, minutes: 55 },
  { id: 18, minutes: 0 },
  { id: 19, minutes: 0 },
  { id: 20, minutes: 0 },
  { id: 21, minutes: 0 },
  { id: 22, minutes: 0 },
  { id: 23, minutes: 0 },
];

test('Function drawChart is working ', () => {
  expect(drawChart(dataTest)).toEqual(resultTest);
});
