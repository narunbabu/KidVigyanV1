import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
} from 'react-native';

export default class ProgressThick extends Component {
  state = {
    progressStatus: 100 * 0.965,
  };
  anim = new Animated.Value(50);
  componentDidMount() {
    this.onAnimate();
  }
  onAnimate = () => {
    //   this.anim.addListener(({value}) => {
    //     this.setState({progressStatus: parseInt(value, 10)});
    //   });
    //   Animated.timing(this.anim, {
    //     toValue: 100,
    //     duration: 50000,
    //   }).start();
  };
  render() {
    return (
      //   <View style={styles.container}>
      <ImageBackground
        style={styles.progressbar}
        source={require('./assets/progress_bar.png')}>
        <Animated.View
          style={[styles.inner, {width: this.state.progressStatus + '%'}]}
        />
        <Animated.Text style={styles.label}>
          {this.state.progressStatus / 0.965}%
        </Animated.Text>
      </ImageBackground>
      //   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    padding: 3,
    borderColor: '#FAA',
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 200,
    justifyContent: 'center',
  },
  progressbar: {
    width: '100%',
    height: 40,
    padding: 3,
  },
  inner: {
    // width: 400,
    height: 26,
    borderRadius: 15,
    backgroundColor: 'green',
    marginTop: 3,
    marginLeft: 5,
  },
  label: {
    fontSize: 23,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
});
