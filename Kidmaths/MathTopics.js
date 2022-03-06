import React, {useEffect, useState} from 'react';
import {startup, playStartup, playHalfWin} from './audio';
import ProgressThick from './ProgressThick';
import Fireworks from 'react-native-fireworks';
import {
  Text,
  ImageBackground,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
// import Confetti from './Confetti';
import {operations} from './Data/Data';
import SoundComp from './SoundComp';
// import Confetti from './Confetti';
const TopicsApp = ({navigation}) => {
  // , operations, level
  const [level, setLevel] = useState(0);
  const [soundon, setSoundon] = useState(true);
  const conditional_play = () => {
    console.log('in conditional_play');
    soundon
      ? startup.play(success => {
          success ? console.log('play success') : console.log('not playing');
        })
      : startup.stop();
  };
  useEffect(() => {
    console.log(
      'in MathTopics soundon useEffect################################################# soundon',
      soundon,
    );
    conditional_play();
  }, [soundon]);

  useEffect(() => {
    console.log(
      'Entering MathTopics useEffect#################################################',
    );
    // console.log(operations, level);

    conditional_play();
    // playHalfWin();
    const willFocusSubscription = navigation.addListener('focus', () => {
      conditional_play();
    });
    return willFocusSubscription;
  }, []);
  return (
    <Fireworks
      speed={3}
      density={8}
      colors={['#ff0', '#ff3', '#cc0', '#ff4500', '#ff6347']}
      iterations={5}
      height={150}
      width={100}
      zIndex={2}
      circular={true}
    />
  );

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
        {operations.map(k => (
          <TouchableOpacity
            key={k.id}
            onPress={() => {
              startup.stop();
              console.log('pressed topic');
              return navigation.navigate('GameTilesScreen', {
                navigation: navigation,
                operation: k,
                level: level,
              });
            }}>
            <ImageBackground
              // key={k.id}
              source={require('./assets/button.png')}
              style={{
                ...styles.banner,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{k.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
      <SoundComp soundon={soundon} setSoundon={setSoundon} />

      {/* <Image
        source={require('./assets/arrow_next.png')}
        style={styles.next}
      /> */}
      {/* <ProgressThick /> */}
    </ImageBackground>
  );
};

export default TopicsApp;

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
