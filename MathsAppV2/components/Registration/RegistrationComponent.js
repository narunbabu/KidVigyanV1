import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import {DevSettings} from 'react-native';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import {styles} from './Styles';
import MyButton from './MyButton';
import {
  db,
  user,
  createUserTable,
  createScoresTable,
  deleteTable,
  storeData,
  getData,
} from '../../Functions/SqlFunctions';
import {class_options, operations} from '../../Data/Data';
const RegistrationComponent = ({
  tohide,
  setAdduser,
  userdata,
  setUserdata,
  isparent,
  setIsparent,
  criticalscores,
  navigation,
}) => {
  const [dob, setDob] = useState(new Date('2016-07-03'));
  const [name, setName] = useState('');
  const [sclass, setSclass] = useState(class_options[0]); //Class of student
  var person = {
    name: name,
    dob: dob,
    sclass: sclass,
    dor: new Date(),
    ischild: !isparent,
  };
  // var stack = {
  //   user_id: 0,
  //   operation_id: 0,
  //   date: new Date().toJSON(),
  //   level: 1,
  //   parent_id: null,
  // };
  // var child_stack = {
  //   stack_id: 0,
  //   child_id: null,
  //   date: new Date().toJSON(),
  // };

  const register_user = () => {
    console.log('in register user!', person);
    person['dob'] = person.dob.toJSON();
    person['dor'] = person.dor.toJSON();
    storeData(db, 'Users', person, ['name']);
    setImmediate(
      () =>
        getData(
          db,
          'Users',
          ['id', 'name', 'dob', 'ischild'],
          setUserdata,
          'in registration register',
        ),
      100,
    );
    setSclass(class_options[0]);

    // navigation.goBack();
  };

  // useEffect(() => {
  //   // console.log('score in RegistrationComponent useeffect', criticalscores);
  //   console.log('in registration component isparent', isparent);
  //   // deleteTable(db);
  //   // createUserTable(db);
  //   // createScoresTable(db);
  //   // getAll(db);
  //   // getData();
  // }, []);
  // const storeInitialStack2Children = () => {
  //   userdata.filter(k => k.ischild);
  //   operations.map(k => {
  //     child_stack['child_id'] = k.id;
  //     storeData(db, 'ChildStack', child_stack, ['date']);
  //   });
  // };
  useEffect(() => {
    if (criticalscores && userdata) {
      console.log(
        'score userdata in checkNstore registration component',
        criticalscores,
        userdata,
      );
      if (userdata.length > 0)
        navigation.navigate({
          name: 'MathScreen',
          params: {
            user: {...userdata[0], child_id: 1},
            criticalscores: criticalscores,
            stackdata: operations.slice(0, 3),
          }, //[...stackdata.filter(k => k.id != op.id), op]
          merge: true,
        });
    }
    // DevSettings.reload();
  }, [userdata]);

  const checkNstore = () => {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    if (!sclass.trim()) {
      alert('Please Select class');
      return;
    }
    console.log('registering user');
    register_user();
    setImmediate(() => setAdduser(true), 100);
  };

  const ClassComp = ({hide}) => {
    if (hide) {
      return null;
    } else {
      return (
        <>
          {/* <Text style={styles.label}>Class</Text> */}
          <View style={styles.dropdown}>
            <ModalDropdown
              style={styles.dropdown_2}
              defaultValue={sclass}
              options={class_options}
              onSelect={(idx, value) => setSclass(value)}
            />
          </View>
        </>
      );
    }
  };

  if (tohide) {
    return null;
  } else {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setName(text)}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <DatePicker
              style={styles.date}
              date={dob}
              mode={'date'}
              onDateChange={date => {
                setDob(date);
              }}
            />
            {/* </View> */}
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <RadioButton
                value="parent"
                color="green"
                status={isparent ? 'checked' : 'unchecked'}
                onPress={() => setIsparent(true)}
              />
              <Text style={{fontSize: 25, marginRight: 30}}>Parent</Text>

              <RadioButton
                color="green"
                value="child"
                status={!isparent ? 'checked' : 'unchecked'}
                onPress={() => setIsparent(false)}
              />
              <Text style={{fontSize: 25}}>Child</Text>
            </View>
            <ClassComp hide={isparent} />
          </View>
          <View
            style={{
              flexDirection: 'row',

              alignSelf: 'center',
            }}>
            <MyButton
              title="Cancel"
              customClick={() => {
                setAdduser(true);
              }}
            />
            <MyButton
              title="Add"
              color="green"
              customClick={() => {
                checkNstore();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
};
export default RegistrationComponent;
