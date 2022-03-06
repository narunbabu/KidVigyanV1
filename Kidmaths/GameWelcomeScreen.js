import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import UserHomeScreen from './Registration/UserHomeScreen';

// import {styles} from './Registration/Styles';
import {Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import GameWelcomeApp from './GameWelcome';
// import GameTilesApp from './GameTiles';
import TopicsApp from './MathTopics';
import {MathScreen} from './MathApp';
import {operations} from './Data/Data';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  db,
  // createTable,
  // user,
  createSingleTable,
  deleteTable,
  // createUserTable,
  // createScoresTable,
  // deleteTable,
  // storeData,
  // getData,
} from './Functions/SqlFunctions';
import {score} from './Data/Models';
import GameTilesScreen from './GameTiles';
const Stack = createNativeStackNavigator();

const MyWelcomeScreen = () => {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
};

const GamesWelcomeScreen = ({navigation, route}) => {
  return (
    <GameWelcomeApp
      navigation={navigation}
      // operations={route.params.operations}
    />
  ); //level={route.params.level}
};

const MathTopicsScreen = ({navigation, route}) => {
  return (
    <TopicsApp
      navigation={navigation}
      // operations={route.params.operations}
      // level={route.params.level}
    />
  ); //
};

// const GameTilesScreen = ({navigation, route}) => {
//   useEffect(() => {
//     console.log('route.params in Gametilescreen...', route.params);
//     if (route.params?.ext_score) {
//       return (
//         <GameTilesApp
//           navigation={navigation}
//           operation={route.params.operation}
//           level={route.params.level}
//           score={route.params.ext_score}
//         />
//       );
//     }
//   }, [route.params?.ext_score]);
//   return (
//     <GameTilesApp
//       navigation={navigation}
//       operation={route.params.operation}
//       level={route.params.level}
//       score={route.params.ext_score}
//     />
//   ); //
// };
const HomeScreen = () => {
  // const HomeScreen = ({navigation, route}) => {
  // const {userdata} = route.params;
  useEffect(() => {
    // console.log('GameWelcomescreen  in homescreen score...', score);
    // deleteTable(db, {Score: score});
    createSingleTable(db, score, 'Score');
  }, []);

  const operation = {
    ...operations[0],
    operation_id: operations[0].id,
    mistypes: 0,
    time_taken: 0,
    score: 0,
    passed: 0,
    num_problems_done: 0,
  };

  return (
    <>
      {/* <NavigationContainer> */}
      <Stack.Navigator
        initialRouteName="MathTopicsScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen
          name="GamesWelcomeScreen"
          component={GamesWelcomeScreen}
          options={{title: 'Select an Operation'}}
          // initialParams={{user: userdata[0], stackdata: {}}}
        /> */}
        <Stack.Screen
          name="MathTopicsScreen"
          component={MathTopicsScreen}
          options={{title: 'Progress of Children'}}
          initialParams={{operations: operations, level: 0}}
        />

        <Stack.Screen
          name="GameTilesScreen"
          component={GameTilesScreen}
          options={{title: 'Tiles'}}
          initialParams={{operation: operation, level: 0}}
        />

        {/* <Stack.Screen name="StackScreen" component={GameSelect} /> */}
        <Stack.Screen
          name="MathScreen"
          component={MathScreen}
          options={{title: 'Maths Operation'}}
          initialParams={{
            // user: userdata[0],
            stackdata: [operations.slice(0, 3)],
            operation: operation,
            totaldayscore: 0,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MyWelcomeScreen;
