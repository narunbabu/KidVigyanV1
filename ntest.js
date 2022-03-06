// const moment = require('moment');
// // console.log(moment("Sat Oct 09 2021".substring(0, 10), 'YYYY-MM-DD'));
// console.log('Sat Oct 09 2021'.substring(4, 15));
// console.log(moment('Sat Oct 09 2021'.substring(4, 15), 'MMM DD YYYY'));
const func1 = f => {
  console.log(' func1');
  return f();
};

const func2 = () => {
  console.log(' func2');
  return true;
};
const func3 = () => {
  console.log(' func3');
  return true;
};
const func4 = () => {
  console.log(' func4');
  return true;
};

func1(func2);
