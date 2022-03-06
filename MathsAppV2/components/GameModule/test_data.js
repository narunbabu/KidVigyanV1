// import React from 'react';
// import faker from 'faker';
const moment = require('moment');
const _ = require('lodash');
const ScoreFunctions = require('../../Functions/ScoreFunctions');
const operations = [
  {
    subject: 'Mathematics',
    name: 'Addition',
    operator: '+',
    id: 0,
    operation_id: 0,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Mathematics',
    name: 'Subtraction',
    operator: '−',
    id: 1,
    operation_id: 1,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Mathematics',
    name: 'Multiplication',
    operator: '×',
    id: 2,
    operation_id: 2,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Mathematics',
    name: 'Comparison',
    operator: '=',
    id: 3,
    operation_id: 3,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Programming',
    name: 'Logic',
    operator: '==',
    id: 4,
    operation_id: 4,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Electronics',
    name: 'Components',
    operator: 'c',
    id: 5,
    operation_id: 5,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'Programming',
    name: 'Loops',
    operator: 'O',
    id: 6,
    operation_id: 6,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },
  {
    subject: 'English',
    name: 'Fill Blanks',
    operator: 'o_o',
    id: 7,
    operation_id: 7,
    isChecked: false,
    num_problems: 10,
    level: 1,
  },

  // ,{name:'Division',operator:'÷',id:3},{name:'Comparisons',operator:'=',id:4}
  // ,{name:'Comparisons2',operator:'=1',id:5},{name:'Comparisons3',operator:'=2',id:6}
]; //]
const print = vals => {
  var string = '';
  vals.forEach(element => {
    string += element + ' ';
  });
  console.log(string);
};
// import {operations} from '../../Data/Data';
// const data = require('../../Data/Data');
subjects = ScoreFunctions.groupByKey(operations, 'subject');
subjects = Object.keys(subjects);
index = 0;
console.log(subjects[index]);
console.log(subjects);
console.log(Object.keys(subjects));

subjects.map((subject, tabIndex) => {
  // const {routeName, params} = route;
  // const {icon, tabName} = params || {};
  tabName = subject;
  // const color = tabIndex === index ? 'white' : 'black';
  console.log(tabName, tabIndex);
});
