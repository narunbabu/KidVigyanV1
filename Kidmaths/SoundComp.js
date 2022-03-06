import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import {styles} from './Styles';
const SoundComp = ({soundon, setSoundon}) => {
  useEffect(() => {}, []);
  return soundon ? (
    <TouchableOpacity
      style={styles.soundapp}
      accessibilityRole="button"
      onPress={() => setSoundon(false)}>
      <Image source={require('./assets/sound_on.png')}></Image>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.soundapp}
      accessibilityRole="button"
      onPress={() => setSoundon(true)}>
      <Image source={require('./assets/sound_off.png')}></Image>
    </TouchableOpacity>
  );
};

export default SoundComp;
