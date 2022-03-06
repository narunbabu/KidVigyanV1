import React, {useState, useEffect} from 'react';
// import {Text, View, StyleSheet, FlatList, Button, Modal} from 'react-native';
import UserChecklist from './UserChecklist';
import HomeButton from '../../HomeButton';
import {
  db,
  getDataWithextrafieldWithFilter,
  getData,
  storeData,
  deleteRows,
} from '../../../Functions/SqlFunctions';
import {stack} from '../../../Data/Models';
import ModalDropdown from 'react-native-modal-dropdown';
import {datalimits} from '../../../Data/Data';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
// import {levels} from '../../../Data/Data';
import GameItem from './GameItem';
import SelectedItem from './SelectedItem';
import {operations} from '../../../Data/Data';
import StackItems from './StackItems';
import {Center} from 'native-base';

function MyTabs({initchildid, setStackdata, stackdata, userdata}) {
  // useEffect(() => {
  //   console.log('initchildid', initchildid);
  // }, []);
  return (
    <Tab.Navigator
      initialRouteName={userdata.find(k => k.id == initchildid).name}>
      {userdata.map(k => (
        <Tab.Screen
          key={k.name}
          name={k.name}
          component={GameSelectPart}
          initialParams={{
            childid: k.id,
            setStackdata: setStackdata,
            stackdata: stackdata,
            userdata: userdata,
          }}
          options={{tabBarLabel: k.name}}
        />
      ))}
    </Tab.Navigator>
  );
}
const GameSelect = ({navigation, route}) => {
  const {childid, setStackdata, stackdata, userdata} = route.params;

  // const [selected, setSelected] = useState(stackdata);
  // const [localStackdata, setLocalstackdata] = useState();

  onChangeTab = index => {};
  return stackdata ? (
    <>
      <MyTabs
        initchildid={childid}
        userdata={userdata}
        stackdata={stackdata}
        setStackdata={setStackdata}
      />
    </>
  ) : null;
};

const GameSelectPart = ({navigation, route}) => {
  const {childid, stackdata, userdata} = route.params;

  const [selected, setSelected] = useState(
    stackdata.filter(k => k.user_id == childid),
  );
  const [stackchanged, setStackchanged] = useState(false);

  // const [userdata, setUserdata] = useState([]);
  const [localStackdata, setLocalstackdata] = useState();

  const storeStack = () => {
    if (checkStack()) {
      const executeasync = () => {
        deleteRows(db, 'Stack', 'user_id = ' + childid);
        // console.log(selected);
        let mstackdata = selected.map(s => {
          let item = {};
          Object.keys(stack).forEach(k => {
            if (Object.keys(s).some(l => l == k)) item[k] = s[k];
          });
          item['user_id'] = childid;
          item['date'] = new Date().toJSON();
          // console.log('sssssssssssssssssss= ', item, s);
          item['operation_id'] = operations.find(k => k.name == s.name).id;
          item['parent_id'] = 0;
          console.log('Item.', item);
          delete item['id'];
          return item;
        });
        mstackdata.map(item => storeData(db, 'Stack', item, ['date']));
        let finalstack = [
          ...stackdata.filter(k => k.user_id != childid),
          ...mstackdata,
        ];
        setLocalstackdata(finalstack);
        setStackchanged(false);
      };
      setImmediate(executeasync, 100);

      // console.log(
      //   ' finalstack userdata in storeStack of game select',
      //   finalstack,
      //   userdata,
      // );
      // }
      // });
      Alert.alert('Successfully set stack');

      // return Alert.alert('Success', 'Successfully set stack', [
      //   {
      //     text: 'OK',
      //     onPress: () => true,
      //     style: 'cancel',
      //   },
      // ]);

      // navigation.push('Progress', {
      //   userdata: userdata,
      //   stackdata: finalstack,
      //   setStackdata: setStackdata,
      // });
      return true;

      // navigation.navigate({
      //   name: 'ParentScreen',
      //   params: {orstackdata: finalstack, userdata: userdata},
      //   merge: true,
      // });
    }
  };

  // operations.map(k => {
  //   selected['child_id'] = k.id;
  // });

  const checkStack = () => {
    // var usercheck = userdata.some(k => k.isChecked);
    var storecheck = selected.length > 0;
    if (storecheck) return true;
    if (!storecheck) {
      Alert.alert('Please select atleast one stack');
    }
    //  else {
    //   usercheck ? null : Alert.alert('Please select atleast one user');
    //   storecheck ? null : Alert.alert('Add atleast one stack');
    // }
    return false;
  };
  const appendItem = item => {
    item = {...item, id: selected.length};
    setSelected(selected => [...selected, item]);
  };
  const alertAddnewLevel = item => {
    Alert.alert('Repetition', 'Repetition of excersize but different level', [
      {
        text: "Don't Add",
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Add',
        onPress: () => appendItem(item),
        style: 'success',
      },
    ]);
  };
  const alertAddsameLevel = item => {
    Alert.alert('Repetition', 'Repetition of excersize at same level', [
      {
        text: "Don't Add",
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Add',
        onPress: () => {
          // let newselected = selected.filter(
          //   s => !(s.name == item.name && s.level == item.level),
          // );
          // let newitem = selected.find(
          //   s => s.name == item.name && s.level == item.level,
          // );

          let newselected = selected.map(s =>
            s.name == item.name && s.level == item.level
              ? {
                  ...s,
                  num_problems:
                    s.num_problems + item.num_problems >
                    datalimits.num_problemsperlevel_limit
                      ? datalimits.num_problemsperlevel_limit
                      : s.num_problems + item.num_problems,
                }
              : s,
          );

          // newitem['num_problems'] =
          //   newitem['num_problems'] + item['num_problems'];

          // newitem['num_problems'] > datalimits.num_problemsperlevel_limit
          //   ? (newitem['num_problems'] = datalimits.num_problemsperlevel_limit)
          //   : null;

          setSelected([...newselected]);
        },
        style: 'success',
      },
    ]);
  };
  // const RepeatHandler = item => {
  //   const addItem = item => {};

  //   Alert.alert(
  //     'Repetition',
  //     'Repetition of excersize.',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => Alert.alert('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Add',
  //         onPress: () => Alert.alert('Ok Pressed'),
  //         style: 'success',
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //       onDismiss: () =>
  //         Alert.alert(
  //           'This alert was dismissed by tapping outside of the alert dialog.',
  //         ),
  //     },
  //   );
  // };

  const handleChange = item => {
    setStackchanged(true);
    console.log('in handle change');
    if (selected.length < datalimits.num_operations) {
      let repeated = selected.filter(s => item.name == s.name);
      console.log(' repeated', repeated);
      if (repeated.length == 0) {
        appendItem(item);
      } else {
        let levelrepeated = repeated.filter(s => item.level == s.level);
        if (levelrepeated.length == 0) {
          alertAddnewLevel(item);
        } else {
          console.log(' level repeated', levelrepeated, item);
          alertAddsameLevel(item);
        }
      }
    } else {
      Alert.alert(
        'Warning!',
        'Max operations allowed is ' +
          datalimits.num_operations +
          '. Delete existing ones to change',
      );
    }
    // console.log('after add item,selected', item, selected);
  };

  // const deleteItem = item => {
  //   let temp = selected.filter(operation => item.id != operation.id);
  //   setSelected(selected.filter(o => o.id != item.id));
  //   console.log('after delete ', selected);
  // };

  //   let selected = operations.filter(operation => operation.isChecked);
  const renderItem = ({item}) => <GameItem item={item} myFunc={handleChange} />;
  // const renderGridItem = ({item}) => (
  //   <SelectedItem item={item} myFunc={deleteItem} />
  // );

  const renderFlatList = renderData => {
    return <FlatList data={renderData} renderItem={renderItem} />;
  };

  const readStack = () => {
    async function loadDataAsync() {
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
          setLocalstackdata,
          'from gameselect Stack',
        );
        console.log('done inside get data from child and stackdata');
      } catch (e) {
        createTable(db, models);
      }
    }
    loadDataAsync();
  };
  // const checkDatasaved = () => {
  //   if (stackchanged)
  //     return Alert.alert('Save Stack?', 'Do you want to save the Changes?', [
  //       {
  //         text: 'Yes',
  //         onPress: () => {
  //           if (storeStack()) {
  //             console.log('storeStack returned true');
  //             setStackchanged(false);
  //             return true;
  //           } else {
  //             return true;
  //           }
  //         },
  //         style: 'success',
  //       },
  //       {
  //         text: 'No',
  //         onPress: () => true,
  //         style: 'cancel',
  //       },
  //     ]);
  //   else return true;
  // };
  // const checkDatasavedNexecuteBack = () => {
  //   if (stackchanged)
  //     return Alert.alert('Save Stack?', 'Do you want to save the Changes?', [
  //       {
  //         text: 'Yes',
  //         onPress: () => {
  //           if (storeStack()) {
  //             setStackchanged(false);
  //             return true;
  //           } else {
  //             return true;
  //           }
  //         },
  //         style: 'success',
  //       },
  //       {
  //         text: 'No',
  //         onPress: () => true,
  //         style: 'cancel',
  //       },
  //     ]);
  //   else return true;
  // };
  // useEffect(() => {
  //   console.log();
  //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> entering ');
  //   console.log();
  //   return () => {
  //     console.log();
  //     console.log('leaving gameselect >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  //     console.log();
  //     checkDatasaved();
  //   };
  // }, []);
  // useEffect(() => {
  //   setStackchanged(true);
  // }, [selected]);

  const navigateparentscreen = () =>
    navigation.navigate({
      name: 'ParentScreen',
      params: {orstackdata: localStackdata, userdata: userdata}, //[...stackdata.filter(k => k.id != op.id), op]
      merge: true,
    });

  return (
    <View style={styles.container}>
      {/* <View style={{height: '10%'}}>
        <UserChecklist userdata={userdata} setUserdata={setUserdata} />
      </View> */}
      <View
        style={{
          height: '65%',
          // backgroundColor: '#ababab',
          margin: 5,
          borderColor: '#aaa',
        }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{justifyContent: 'center'}}>
          {renderFlatList(operations)}
        </KeyboardAvoidingView>
      </View>
      <View style={{height: '35%', backgroundColor: '#ffafaf', margin: 5}}>
        <Text style={styles.text}>Selected </Text>
        {/* {console.log('selected in component', selected)} */}
        <StackItems setSelected={setSelected} selected={selected} />
        {/* <View style={{height: '25%'}}>{renderGridList(selected)}</View>
         */}
        <View
          style={{
            // height: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <TouchableHighlight
            style={{...styles.addtostack, backgroundColor: 'red', width: 200}}
            onPress={() => {
              setSelected([]);
            }}>
            <Text>Clear all</Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            // height: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {/* <TouchableHighlight
            style={{...styles.addtostack, backgroundColor: 'red'}}
            onPress={
              () => {
                let res = checkDatasaved();
                console.log('res', res);
                if (res)
                  return navigation.push('ParentScreen', {
                    orstackdata: localStackdata,
                    userdata: userdata,
                  });
              }

              // navigation.navigate({
              //   name: 'ParentScreen',
              //   // params: {orstackdata: finalstack, userdata: userdata},
              //   // merge: true,
              // })
            }>
            <Text>Back</Text>
          </TouchableHighlight> */}
          <TouchableHighlight
            style={{...styles.addtostack, width: 200}}
            onPress={() => {
              storeStack();
            }}>
            <Text>Save</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight
          style={styles.addtostack}
          onPress={() => {
            readStack();
          }}>
          <Text>Read Stack</Text>
        </TouchableHighlight> */}
        </View>
      </View>
      <TouchableOpacity
        key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => {
          if (stackchanged)
            Alert.alert('Warning!!', 'You may want to save changes!!?', [
              {
                text: 'Yes',
                onPress: () => {
                  // () => storeStack();
                  // Alert.alert('Click back button again!');
                },
                style: 'success',
              },
              {
                text: 'No',
                onPress: () => navigateparentscreen(),
                style: 'cancel',
              },
            ]);
          else navigateparentscreen();
        }}
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
          {'Back'}
        </Text>
      </TouchableOpacity>

      {/* {localStackdata ? <StackItems selected={localStackdata} /> : null} */}
      {/* <HomeButton navigation={navigation} funcBefore={() => checkDatasaved()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addtostack: {
    // position: 'absolute',
    width: 50,
    height: 30,
    paddingTop: 5,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default GameSelect;
