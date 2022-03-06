import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const HomeButton = ({navigation, funcBefore}) => {
  // const runtwo = (firstfunc, callback) => {
  //   firstfunc();
  //   callback();
  // };
  const function2run = () => {
    // return navigation.push('Users');
    if (funcBefore) {
      let success = funcBefore();
      console.log(' in HomeButton, success?', success);
      if (success) {
        console.log(' navigating..........');
        return navigation.push('Users');
      }
    } else {
      return navigation.push('Users');
    }
  };
  return (
    <TouchableOpacity
      key={Math.random().toString()}
      accessibilityRole="button"
      onPress={() => function2run()}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        marginTop: 16,
        width: 80,
        height: 80,
        paddingTop: 25,
        backgroundColor: '#e6f0e9',
        borderRadius: 50,
        borderColor: '#12331b',
        borderWidth: 1,
        alignItems: 'center',
      }}>
      <Text style={{color: '#12331b', fontSize: 15, fontWeight: '700'}}>
        {'Home'}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeButton;
