import React from 'react';
import {useEffect, useState} from 'react';
import {TouchableHighlight, Text} from 'react-native';
// import ParentModule from './ParentModule';
import MyButton from '../Registration/MyButton';
import Progress from './Progress/Progress';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameSelect from './StackMake/GameSelect';
import HomeButton from '../HomeButton';
const Stack = createNativeStackNavigator();

const ProgressScreen = ({navigation, route}) => {
  return (
    <Progress
      userdata={route.params.userdata}
      stackdata={route.params.stackdata}
    />
  );
};

import {operations} from '../../Data/Data';
const ParentScreen = ({navigation, route}) => {
  const {userdata, orstackdata} = route.params;
  const [stackdata, setStackdata] = useState(operations);
  useEffect(() => {
    if (route.params?.orstackdata) {
      console.log(' route params orstackdata inParentScreen ', orstackdata);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setStackdata(route.params.orstackdata);
    }
  }, [route.params?.orstackdata]);

  // useEffect(() => {
  //   if (route.params?.stackdata) {
  //     console.log(' route params ', stackdata);
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //     setProcstackdata(route.params.stackdata);
  //   }
  // }, [route.params?.stackdata]);

  useEffect(() => {
    setStackdata(orstackdata);
    console.log('userdata in parent screen ', userdata, orstackdata);
  }, []);

  return (
    <>
      {userdata && stackdata ? (
        <Progress
          navigation={navigation}
          chid={0}
          userdata={userdata}
          stackdata={stackdata}
          setStackdata={setStackdata}
        />
      ) : (
        <Text>Loading progress...</Text>
      )}
      <HomeButton navigation={navigation} />
    </>
  );
};

export default ParentScreen;
