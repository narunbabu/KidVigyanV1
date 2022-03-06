export const p = obj => {
  console.log(
    'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
  );
  obj.map(k => {
    console.log(k.id, '----------------------------------');
    Object.keys(k).map(s => console.log('      ', s, ': ', k[s]));
  });
  console.log(
    'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
  );
};

export const bigx = () => {
  for (let i = 0; i < 10; i++) {
    console.log(
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    );
    console.log();
  }
};

module.exports = {
  p,
  bigx,
};
