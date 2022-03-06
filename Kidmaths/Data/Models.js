export const user = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  name: 'TEXT NOT NULL UNIQUE',
  dob: 'TEXT',
  sclass: 'TEXT',
  dor: 'TEXT',
  coins: 'INTEGER',
  ischild: 'BOOLEAN',
  last_accessed: 'BOOLEAN',
};
export const stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  user_id: 'INTEGER',
  operation_id: 'INTEGER',
  date: 'TEXT',
  level: 'INTEGER',
  parent_id: 'INTEGER',
  num_problems: 'INTEGER',
};
export const child_stack = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  stack_id: 'INTEGER',
  child_id: 'INTEGER',
  date: 'TEXT',
};
export const score = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  problem_number: 'INTEGER',
  // child_id: 'INTEGER',
  // subject_id: 'INTEGER',
  operation_id: 'INTEGER',
  level: 'INTEGER',
  date: 'TEXT',
  time_taken: 'FLOAT',
  mistypes: 'FLOAT',
  passed: 'BOOLEAN',
  score: 'FLOAT',
  // uniquefields: 'problem_number, operation_id, level ',
};
export const stackwise_day_score = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  subject_id: 'INTEGER',
  operation_id: 'INTEGER',
  level: 'INTEGER',
  date: 'TEXT',
  mistypes: 'FLOAT',
  time_taken: 'FLOAT',
  num_problems_set: 'INTEGER',
  num_problems_done: 'INTEGER',
  score: 'FLOAT',
  passed: 'INTEGER',
  uniquefields: 'child_id, subject_id, operation_id, level ',
};
export const stackwise_score = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  subject_id: 'INTEGER',
  operation_id: 'INTEGER',
  level: 'INTEGER',
  date: 'TEXT',
  mistypes: 'FLOAT',
  time_taken: 'FLOAT',
  num_problems_set: 'INTEGER',
  num_problems_done: 'INTEGER',
  score: 'FLOAT',
  passed: 'INTEGER',
};

export const subjects_operations = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  subject_id: 'INTEGER',
  subject_name: 'TEXT',
  operation_id: 'INTEGER',
  operation_name: 'TEXT',
  operation_symbol: 'TEXT',
  date: 'TEXT',
};
export const progress = {
  id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  child_id: 'INTEGER',
  date: 'TEXT',
  gold_coins: 'INTEGER',
  gold_stars: 'INTEGER',
  uniquefields: 'child_id ',
};
export const models = {
  Users: user,
  Stack: stack,
  ChildStack: child_stack,
  Score: score,
  Progress: progress,
  Subjects_Operations: subjects_operations,
  StackWiseDayScore: stackwise_day_score,
  StackWiseScore: stackwise_score,
};
