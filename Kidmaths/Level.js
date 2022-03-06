import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useState, useEffect} from 'react';
const LevelComp = ({onLevelUp, onLevelDown, level, style}) => {
  return (
    <View style={style}>
      <TouchableOpacity
        // key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => onLevelUp()}>
        <Image
          key={Math.random().toString()}
          source={require('./assets/level_up.png')}
          style={{
            width: 50,
            height: 15,
            marginBottom: 0,
          }}
        />
      </TouchableOpacity>
      <ImageBackground
        key={Math.random().toString()}
        source={require('./assets/level_back.png')}
        style={{
          width: 100,
          height: 30,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 1,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          LEVEL {level}
        </Text>
      </ImageBackground>
      <TouchableOpacity
        // key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => onLevelDown()}>
        <Image
          key={Math.random().toString()}
          source={require('./assets/level_down.png')}
          style={{
            width: 50,
            height: 15,
            marginTop: 0,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LevelComp;
