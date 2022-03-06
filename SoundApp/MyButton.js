import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {playButtonPress, playListPull, playListPullFinished} from './audio';

export default class MyButton extends Component {
  render() {
    return (
      <>
        <TouchableOpacity onPress={playButtonPress}>
          <Text>Click me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={playListPull}>
          <Text>Click me</Text>
        </TouchableOpacity>
      </>
    );
  }
}
