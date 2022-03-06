import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserHomeScreen from './Registration/UserHomeScreen';
import GamesScreen from './GameModule/GameScreenV1';
import ParentScreen from './ParentModule/ParentScreen';
// import ParentGamesScreen from './ParentGamesScreen';
import {MathScreen} from './GameModule/MathApp';
import GameSelect from './ParentModule/StackMake/GameSelect';
import {styles} from './Registration/Styles';
import {Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import {operations} from '../Data/Data';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {red400} from 'react-native-paper/lib/typescript/styles/colors';
const cfn = require('../Functions/ConsoleFunctions');
import {db, getData, createTable, deleteTable} from '../Functions/SqlFunctions';
import {user, models} from '../Data/Models';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        // alignSelf: 'flex-end',
        // width: 200,
        height: 20,
        borderColor: 'red',
        borderRadius: 50,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={Math.random().toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#e1e1e1',
            }}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const MyWelcomeScreen = () => {
  const [userdata, setUserdata] = useState([
    {id: 0, name: 'child', dob: '10-06-80', ischild: true},
  ]);
  const operation = {
    ...operations[0],
    operation_id: operations[0].id,
    mistypes: 0,
    time_taken: 0,
    score: 0,
    passed: 0,
    num_problems_done: 0,
  };
  useEffect(() => {
    // console.clear();
    // cfn.bigx();
    // deleteTable(db, {Users: models['Users']});
    // deleteTable(db, {Stack: models['Stack']});
    // deleteTable(db, {Score: models['Score']});
    // deleteTable(db, {StackWiseDayScore: models['StackWiseDayScore']});
    // deleteTable(db, {StackWiseScore: models['StackWiseScore']});
    function loadDataAsync() {
      try {
        getData(
          db,
          'Users',
          ['id', 'name', 'dob', 'ischild'],
          setUserdata,
          'from userhomescreen',
        );
      } catch (e) {
        createTable(db, models);
      }
    }
    setImmediate(() => loadDataAsync(), 20);
  }, []);

  // useEffect(() => {
  //   userdata ? null : setUserdata([]);
  // }, []);
  // return <Text>Welcomescreen</Text>;

  return (
    <NavigationContainer>
      <HomeScreen userdata={userdata} />
      {/* <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{userdata: userdata}}
        />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
  // ) : (
  //   <Text>Looooooooooooooooooooding</Text>
  // );
};
const HomeScreen = ({userdata}) => {
  // const HomeScreen = ({navigation, route}) => {
  // const {userdata} = route.params;
  useEffect(() => {
    console.log('userdata  in homescreen useeffect', userdata);
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
        initialRouteName="GamesScreen"
        // initialRouteName={'Users'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Users"
          component={UserHomeScreen}
          options={{title: 'Welcome'}}
          initialParams={{score: null, muserdata: userdata}}
        />

        <Stack.Screen
          name="GamesScreen"
          component={GamesScreen}
          options={{title: 'Select an Operation'}}
          initialParams={{user: userdata[0], stackdata: {}}}
        />
        <Stack.Screen
          name="ParentScreen"
          component={ParentScreen}
          options={{title: 'Progress of Children'}}
          initialParams={{userdata: {}, orstackdata: {}}}
        />

        <Stack.Screen name="StackScreen" component={GameSelect} />
        <Stack.Screen
          name="MathScreen"
          component={MathScreen}
          options={{title: 'Maths Operation'}}
          initialParams={{
            user: userdata[0],
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
