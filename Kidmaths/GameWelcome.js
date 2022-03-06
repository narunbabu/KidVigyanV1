import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {subjects} from './Data/Data';
const GameWelcomeApp = ({navigation, operations}) => {
  return (
    <ImageBackground
      source={require('./assets/game_background.png')}
      style={{
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={require('./assets/title_banner.png')}
        style={{
          ...styles.title,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Kid Viyan</Text>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'column',
          // flexWrap: 'wrap',
          // alignSelf: 'center',
          justifyContent: 'center',
          // backgroundColor: '#ebfaa2',
          margin: 20,
          // borderColor: '#f5894e',
          // borderStyle: 'solid',
          // borderWidth: 5,
          // borderRadius: 20,
        }}>
        {subjects.map(k => (
          <TouchableHighlight
            key={k.id}
            onPress={() => {
              console.log('pressed');
              return navigation.navigate('MathTopicsScreen', {
                operations: operations,
                topic: k.name,
              });
            }}>
            <ImageBackground
              source={require('./assets/button.png')}
              style={{
                ...styles.banner,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{k.name}</Text>
            </ImageBackground>
          </TouchableHighlight>
        ))}
      </View>

      {/* <Image
        source={require('./assets/arrow_next.png')}
        style={styles.next}
      /> */}
    </ImageBackground>
  );
};

export default GameWelcomeApp;

const styles = StyleSheet.create({
  banner: {
    width: 160,
    height: 60,
    margin: 5,
    padding: 5,
  },
  title: {
    width: 200,
    height: 40,
    margin: 5,
    padding: 5,
  },
  next: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 0,
    bottom: 0,
    margin: 16,
  },
  back: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 0,
    bottom: 0,
    margin: 16,
  },
});
