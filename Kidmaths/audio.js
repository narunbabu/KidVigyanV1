import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const loadSound = s => {
  let sound = new Sound(s, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    } else {
      sound.setNumberOfLoops(-1);
    }
  });

  return sound;
};

// const gamestart = loadSound(
//   require('./audio/mixkit-medieval-show-fanfare-announcement-226.mp3'),
// );
// export const playGameStart = () => gamestart.play();
// export const stopGameStart = () => gamestart.stop();

export const startup = new Sound(
  require('./audio/mixkit-medieval-show-fanfare-announcement-226.mp3'),
  error => (error ? console.log(error) : startup.setNumberOfLoops(-1)),
);

export const tilesound = new Sound(
  require('./audio/mixkit-melodical-flute-music-notification-2310.mp3'),
  error => (error ? console.log(error) : tilesound.setNumberOfLoops(-1)),
);
export const playStartup = () => startup.play();

const halfwin = new Sound(
  require('./audio/mixkit-male-voice-cheer-2010.mp3'),
  error => console.log(error),
);
export const playHalfWin = () => halfwin.play();

const buttonPress = new Sound(require('./audio/button-1.mp3'), error =>
  console.log(error),
);
export const playButtonPress = () => {
  buttonPress.play(success => {
    console.log('buttonPress success');
  });
};

const pull = new Sound(require('./audio/button-2.mp3'), error =>
  console.log(error),
);
export const playListPull = () => {
  pull.play(success => {
    console.log('buttonPress success');
  });
};

const pullFinished = new Sound(require('./audio/button-3.mp3'), error =>
  console.log(error),
);
export const playListPullFinished = () => {
  pullFinished.play(success => pullFinished.reset());
};
