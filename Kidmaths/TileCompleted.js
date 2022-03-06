import React from 'react';
import {Text, ImageBackground, View, Image} from 'react-native';

const TileCompleted = ({navigation, k, stars, styles}) => {
  //   console.log(k);
  return (
    <View
      key={Math.random.toString()}
      style={{
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',

        borderColor: '#f5894e',
        borderStyle: 'solid',
      }}>
      {stars[k][0] + 0.5 * stars[k][1] > 2.1 ? (
        <ImageBackground
          source={require('./assets/game_completed_new.png')}
          key={k + 1}
          style={styles.tile}></ImageBackground>
      ) : (
        <ImageBackground
          source={require('./assets/game_failed1.png')}
          key={k + 1}
          style={styles.tile}></ImageBackground>
      )}

      <View
        key={Math.random.toString()}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: -10,
        }}>
        {Array.apply(0, Array(stars[k][0]).fill(0))
          .map((_, b) => b)
          .map(k1 => (
            <Image
              key={10000 + k + k * 3 + k1}
              source={require('./assets/star_20px_1.png')}
            />
          ))}
        {stars[k][0] == 1 ? (
          <Image
            key={k + k * 3 + 40001}
            source={require('./assets/star_20px_1.png')}
          />
        ) : null}
        {stars[k][1] == 1 ? (
          <Image
            key={k + 90002}
            source={require('./assets/star_20px_half.png')}
          />
        ) : null}
      </View>
    </View>
  );
};
export default TileCompleted;
