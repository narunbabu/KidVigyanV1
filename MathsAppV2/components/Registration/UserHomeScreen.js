import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableHighlight,
  RoundButton,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import MyButton from './MyButton';
import RegistrationComponent from './RegistrationComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {styles} from './Styles';
// import {FlatList, StyleSheet, StatusBar, Dimensions} from 'react-native';
// import GamesScreen from '../GameScreen';
// import {FAB} from 'react-native-paper';
import {
  db,
  getData,
  createTable,
  deleteTable,
  storeData,
  getDataWithextrafieldWithFilter,
} from '../../Functions/SqlFunctions';
import {user, models} from '../../Data/Models';
import {operations} from '../../Data/Data';

import ChildrenComp from './ChildrenComp';
// import UserChecklist from '../ParentModule/StackMake/UserChecklist';
// const styles = StyleSheet.create({

// });
// var person = {
//   id: null,
//   name: '',
//   dob: '',
//   sclass: '',
//   dor: '',
//   coins: 0,
//   ischild: null,
// };
// var todo = [
//   {
//     childid: 0,
//     arith_type: '',
//     level: 0,
//     n_of_probs: 20,
//     set_date: 0,
//     target_date: 0,
//   },
// ];
var score = [
  {
    childid: 0,
    arith_type: '',
    level: 0,
    start_time: 0,
    end_time: 0,
    passed: false,
  },
];
var child_stack = {
  stack_id: 0,
  child_id: null,
  date: new Date().toJSON(),
};
var stack = {
  id: 0,
  user_id: 0,
  operation_id: 0,
  date: new Date().toJSON(),
  level: 1,
  parent_id: 0,
  num_problems: 20,
};
const tableobject = {Users: user};
const tablestackobject = {Stack: models['Stack']};

const UserHomeScreen = ({navigation, route}) => {
  const {criticalscores, muserdata} = route.params;
  const [adduser, setAdduser] = useState(true); //Class of student
  const [userdata, setUserdata] = useState(muserdata ? muserdata : []); //{id: null, name: 'Notset', ischild: false},

  // const [isstackdatadataloaded, setIsstackdatadataloaded] = useState(false);
  const [stackdata, setStackdata] = useState([]);
  const [isuserdatadataloaded, setIsuserdatadataloaded] = useState(false);
  const [isparent, setIsparent] = useState(false);
  useEffect(() => {
    if (criticalscores) {
      setAdduser(false);
    } else setAdduser(true);
  }, [criticalscores]);

  useEffect(() => {
    console.log(
      'score, operations[0] in UserHomeScreen',
      criticalscores,
      operations[0],
    );
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      // createTable(db, models);
      // storeInitialStack();
      // deleteTable(db, tablestackobject);

      //

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
          setStackdata,
          // 'stack_id', //maxval_key
          'from userhomescreen Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        null;
      }
    }
    userdata ? setIsuserdatadataloaded(true) : null;

    // loadDataAsync();
    setTimeout(() => loadDataAsync(), 20);
  }, []);

  useEffect(() => {
    // deleteTable(db, tableobject);
    // deleteTable(db, tablestackobject);
    // console.log(models['Stack']);
    async function loadDataAsync() {
      try {
        getData(
          db,
          'Users',
          ['id', 'name', 'dob', 'ischild'],
          setUserdata,
          'from userhomescreen',
        );
      } catch (e) {
        console.log('Not loaded userdata');
        // createTable(db, models);
      }
    }
    setTimeout(() => loadDataAsync(), 20);

    // if (stackdata) setIsstackdatadataloaded(true);
  }, []);

  // useEffect(() => {
  //   // async function loadDataAsync() {
  //   try {
  //     getDataWithextrafieldWithFilter(
  //       db,
  //       'Users',
  //       ['id', 'name', 'dob', 'ischild'],
  //       setUserdata,
  //       {isChecked: false}, //Extrafield to add
  //       {ischild: 1}, //Filter on
  //     );
  //   } catch (e) {
  //     console.warn(e);
  //   }
  //   // }
  //   // loadDataAsync();
  // }, []);

  const ParentComp = ({
    navigation,
    isuserdatadataloaded,
    userdata,
    stackdata,
    parentdata,
  }) => {
    // const [parentdata, setParentdata] = useState(null);
    const [childrendata, setChildrendata] = useState(null);
    // stackdata={stackdata}
    if (isuserdatadataloaded) console.log('in isuserdatadataloaded', userdata);
    // useEffect(() => {
    //   if (userdata) {
    //     userdata.filter(k => !k.ischild).length > 0
    //       ? setParentdata(userdata.filter(k => !k.ischild)[0])
    //       : null;
    //     userdata.filter(k => k.ischild).length > 0
    //       ? setChildrendata(userdata.filter(k => k.ischild))
    //       : null;
    //     // console.log('stackdata', stackdata);
    //   }
    // }, []);

    // }
    return parentdata.length > 0 ? (
      <TouchableHighlight
        style={styles.fab}
        onPress={() => {
          return navigation.navigate('ParentScreen', {
            userdata: userdata,
            orstackdata: stackdata,

            // navigation.navigate({
            //   name: 'ParentScreen',
            //   params: {stackdata: finalstack, userdata: userdata},
            //   merge: true,
            // });
          });
        }}>
        <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 10}}>
          Parent
        </Text>
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        style={styles.fab}
        onPress={() => {
          setAdduser(!adduser);
          setIsparent(true);
        }}>
        <Text
          style={{
            alignSelf: 'center',
            color: '#fff',
            paddingTop: 5,
            fontSize: 12,
            textAlign: 'center',
          }}>
          Add parent for more Control
        </Text>
      </TouchableHighlight>
    );
  };
  const MathNav = ({navigation}) => {
    // useEffect(() => {
    //   console.log('userdata  in homescreen useeffect', userdata);
    // }, 100);

    const operation = {
      ...operations[0],
      operation_id: operations[0].id,
      mistypes: 0,
      time_taken: 0,
      score: 0,
      passed: 0,
      num_problems_done: 0,
    };

    const navfunc = () => {
      createTable(db, models);
      return navigation.navigate('MathScreen', {
        user: {},
        stackdata: [operation],
        operation: operation,
        totaldayscore: 0,
      });
    };

    return (
      <TouchableHighlight
        style={styles.startfab}
        // style={{...styles.item, alignSelf: 'center'}}
        // onPress={() => console.log('clicked')}
        onPress={() => navfunc()}>
        <Text style={styles.title}>Start</Text>
      </TouchableHighlight>
    );
  };

  // useEffect(() => {
  // stackdata.length ? null : storeInitialStack();

  // }, [userdata]);

  // useEffect(() => {

  // }, [userdata]);

  // console.log('stackdata ', stackdata);

  return criticalscores || userdata.length > 0 ? (
    <>
      <ImageBackground
        source={require('../../assets/dark_bg.png')}
        style={{flex: 1, padding: 5}}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-v2.png')}
        />

        <ChildrenComp
          navigation={navigation}
          userdata={userdata}
          stackdata={stackdata}
          setStackdata={setStackdata}
        />
        <RegistrationComponent
          tohide={adduser}
          setAdduser={setAdduser}
          setUserdata={setUserdata}
          userdata={userdata}
          isparent={isparent}
          setIsparent={setIsparent}
          criticalscores={criticalscores}
          navigation={navigation}
        />
        <MyButton
          title="Add User"
          tohide={!adduser}
          customClick={() => {
            setAdduser(!adduser);
            setIsparent(false);
          }}
        />
        {criticalscores ? null : (
          <ParentComp
            navigation={navigation}
            isuserdatadataloaded={isuserdatadataloaded}
            userdata={userdata.filter(k => k.ischild)}
            parentdata={userdata.filter(k => !k.ischild)}
            stackdata={stackdata}
          />
        )}
      </ImageBackground>
    </>
  ) : (
    <ImageBackground
      source={require('../../assets/bg-colorvariant.png')}
      style={{flex: 1, padding: 5}}>
      <MathNav navigation={navigation} />
    </ImageBackground>

    // <Text>No Userdata</Text>
  );
};

// export default UserHomeScreen;
export default UserHomeScreen;
