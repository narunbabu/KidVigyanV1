import React from 'react';
// import {Text} from 'react-native';
import GameSelect from './StackMake/GameSelect';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  db,
  getData,
  createTable,
  getDataWithextrafieldWithFilter,
} from '../../Functions/SqlFunctions';
import {operations} from '../../Data/Data';
const Stack = createNativeStackNavigator();
// import {useEffect, useState} from 'react';
// import {
//   db,
//   getData,
//   createTable,
//   getDataWithextrafield,
//   getDataWithextrafieldWithFilter,
// } from '../../Functions/SqlFunctions';
// import {models} from '../../Data/Models';
// import UserChecklist from './UserChecklist';
import {ChartComponent} from './Progress/ChartComponent';
import ParentScreen from './ParentScreen';

const ParentApp = () => {
  const [userdata, setUserdata] = useState();
  const [orstackdata, setOrStackdata] = useState(operations);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      // deleteTable(db, tablestackobject);
      // createTable(db, models);
      // storeInitialStack();

      try {
        getData(
          db,
          'Stack',
          [
            'id',
            'user_id',
            'operation_id',
            'date',
            'level',
            'parent_id',
            'num_problems',
          ],
          setOrStackdata,
          // 'stack_id', //maxval_key
          'from parentscreen Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        createTable(db, models);
      }
    }
    loadDataAsync();
  }, []);

  useEffect(() => {
    try {
      getDataWithextrafieldWithFilter(
        db,
        'Users',
        ['id', 'name', 'dob', 'ischild'],
        setUserdata,
        {isChecked: false}, //Extrafield to add
        {ischild: 1}, //Filter on
      );
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return userdata && orstackdata ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ParentScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="ParentScreen"
          component={ParentScreen}
          options={{title: 'Progress of Children'}}
          initialParams={{userdata: userdata, orstackdata: orstackdata}}
        />
        <Stack.Screen name="StackScreen" component={GameSelect} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;

  return <ParentScreen />;
  // return <ChartComponent />;
  return <GameSelect />;
};

export default ParentApp;
