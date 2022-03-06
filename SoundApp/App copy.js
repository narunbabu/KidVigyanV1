import * as React from 'react';

import {Text} from 'react-native-paper';
const Sound = require('react-native-sound');
function setTestState(testInfo, component, status) {
  component.setState({
    tests: {...component.state.tests, [testInfo.title]: status},
  });
}
//Hello
function playSound(testInfo, component) {
  setTestState(testInfo, component, 'pending');

  const callback = (error, sound) => {
    if (error) {
      Alert.alert('error', error.message);
      setTestState(testInfo, component, 'fail');
      return;
    }
    setTestState(testInfo, component, 'playing');
    // Run optional pre-play callback
    testInfo.onPrepared && testInfo.onPrepared(sound, component);
    sound.play(() => {
      // Success counts as getting to the end
      setTestState(testInfo, component, 'win');
      // Release when it's done so we're not using up resources
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error =>
      callback(error, sound),
    );
  }
}

export default function App() {
  Sound.setCategory('Playback');
  require('./Assets/rever-birds.wav');
  const whoosh = new Sound(require('./ding.mp3'), Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        //    reset the player to its uninitialized state (android only)
        whoosh.reset();
      }
    });
  });
  let hello = new Sound(require('./ding.mp3'), Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log(error);
    }
  });

  hello.play(success => {
    if (!success) {
      console.log('Sound did not play');
    }
  });

  return <Text>Hello</Text>;
}
