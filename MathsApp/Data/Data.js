export const datalimits = {
  num_problemsperlevel_lower_limit: 10,
  num_problemsperlevel_limit: 40,
  total_num_problems: 200,
  num_operations: 5,
};
export const constants = {
  dateoptions: {year: 'numeric', month: 'numeric', day: 'numeric'},
};
export const initiation = {
  prob_score: 100,
  time_unit: 1000,
  score_reduce_pertime: 1,
  score_reduce_permistype: 20,
  pass_score: 40,
};
export const operations = [
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

  // {
  //   subject: 'Mathematics',
  //   name: 'Comparison',
  //   operator: '=',
  //   id: 3,
  //   operation_id: 3,
  //   isChecked: false,
  //   num_problems: 10,
  //   level: 1,
  // },
  // {
  //   subject: 'Programming',
  //   name: 'Logic',
  //   operator: '==',
  //   id: 4,
  //   operation_id: 4,
  //   isChecked: false,
  //   num_problems: 10,
  //   level: 1,
  // },
  // {
  //   subject: 'Electronics',
  //   name: 'Components',
  //   operator: 'c',
  //   id: 5,
  //   operation_id: 5,
  //   isChecked: false,
  //   num_problems: 10,
  //   level: 1,
  // },
  // {
  //   subject: 'Programming',
  //   name: 'Loops',
  //   operator: 'O',
  //   id: 6,
  //   operation_id: 6,
  //   isChecked: false,
  //   num_problems: 10,
  //   level: 1,
  // },
  // {
  //   subject: 'English',
  //   name: 'Fill Blanks',
  //   operator: 'o_o',
  //   id: 7,
  //   operation_id: 7,
  //   isChecked: false,
  //   num_problems: 10,
  //   level: 1,
  // },

  // ,{name:'Division',operator:'÷',id:3},{name:'Comparisons',operator:'=',id:4}
  // ,{name:'Comparisons2',operator:'=1',id:5},{name:'Comparisons3',operator:'=2',id:6}
]; //]
export const subjects = [
  {
    id: 0,
    name: 'Mathematics',
  },
  {
    id: 1,
    subject: 'Programming',
  },
  {
    id: 2,
    name: 'English',
  },
  {
    id: 3,
    name: 'Electronics',
  },
  {
    id: 4,
    name: 'Science',
  },
];

export const levels = [
  {level: 1, ndigits: 1},
  {level: 2, ndigits: 2},
  {level: 3, ndigits: 2},
  {level: 4, ndigits: 2},
  {level: 5, ndigits: 3},
];
export const class_options = [
  'Select class..',
  'Under KG',
  '1st Class',
  '2nd Class',
  '3rd Class',
  '4th Class',
];
export const scoreformat = [
  'child_id',
  'op_type',
  'level',
  'start_time',
  'time_taken',
  'passed',
];
//   let operations = {
//     Addition: 1,
//     Subtraction: 2,
//     Multiplication: 3,
//     Division: 4,
//     Comparisons: 5,
//   };
export const problem_structure = [
  {
    number_problems: 10,
    level_numpro: [[1, 10]],
  },
  {
    number_problems: 5,
    level_numpro: [
      [1, 8],
      [2, 2],
    ],
  },
  {
    number_problems: 5,
    level_numpro: [
      [1, 6],
      [2, 4],
    ],
  },
  {
    number_problems: 10,
    level_numpro: [[2, 10]],
  },
  {
    number_problems: 5,
    level_numpro: [
      [2, 8],
      [3, 2],
    ],
  },
  {
    number_problems: 5,
    level_numpro: [
      [2, 6],
      [3, 4],
    ],
  },
  {
    number_problems: 10,
    level_numpro: [[3, 10]],
  },
  {
    number_problems: 5,
    level_numpro: [
      [3, 8],
      [4, 2],
    ],
  },
  {
    number_problems: 5,
    level_numpro: [
      [3, 6],
      [4, 4],
    ],
  },
  {
    number_problems: 10,
    level_numpro: [[4, 10]],
  },
];
