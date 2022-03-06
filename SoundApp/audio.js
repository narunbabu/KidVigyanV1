import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const buttonPress = new Sound(require('../audio/button-1.mp3'), error =>
  console.log(error),
);
export const playButtonPress = () => {
  buttonPress.play(success => {
    console.log('buttonPress success');
  });
};

const pull = new Sound(require('../audio/button-2.mp3'), error =>
  console.log(error),
);
export const playListPull = () => {
  pull.play(success => {
    console.log('buttonPress success');
  });
};

const pullFinished = new Sound(require('../audio/button-3.mp3'), error =>
  console.log(error),
);
export const playListPullFinished = () => {
  pullFinished.play(success => pullFinished.reset());
};
