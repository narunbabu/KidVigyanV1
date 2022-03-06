import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Button, Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {MySurface} from './MySurface';
import {Alert} from 'react-native';
// import {operations} from '../../Data/Data';
const cfn = require('../../Functions/ConsoleFunctions');
import {Modal} from 'react-native';
import {operations, constants} from '../../Data/Data';
import {
  db,
  getData,
  storeData,
  truncateTable,
} from '../../Functions/SqlFunctions';
import {stackwise_day_score, stackwise_score} from '../../Data/Models';
import {TouchableOpacity, Dimensions} from 'react-native';
import HomeButton from '../HomeButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MyModal from './ModalComponent';
import ModalPaper from './ModalPaper';
const GamesScreen = ({navigation, route}) => {
  const {user, stackdata} = route.params;
  const [procstackdata, setProcstackdata] = useState();
  const [day_score, setDay_score] = useState();
  const [day_score_change_not_processed, setDSchangenotProc] = useState(true);
  const [totaldayscore, setTotaldayscore] = useState();
  const table_day_score_object = {StackWiseDayScore: stackwise_day_score};
  const table_score_object = {StackWiseScore: stackwise_score};
  const [newstackdata, setNewstackdata] = useState();
  const [modalVisible, setModalVisible] = useState(true);

  const required_day_score_fields = [
    'id',
    'child_id',
    'subject_id',
    'operation_id',
    'level',
    'date',
    'mistypes',
    'time_taken',
    'num_problems_set',
    'num_problems_done',
    'score',
    'passed',
  ];

  const makeProcstackdata = () => {
    // console.log('stackdata in makeProcstackdata...');
    let myoperations = [];
    operations.map(k => {
      myoperations.push({
        ...k,
        level: 1,
        operation_id: k.id,
        num_problems: 10,
        mistypes: 0,
        time_taken: 0,
        score: 0,
        num_problems_done: 0,
        passed: 0,
      });
    });

    setProcstackdata(myoperations);
  };

  // const loadDayScore = () => {
  //   async function loadDataAsync() {
  //     try {
  //       getData(
  //         db,
  //         'StackWiseDayScore',
  //         required_day_score_fields,
  //         setDay_score,
  //         'from setDay_score',
  //       );
  //       console.log('done inside get data ');
  //     } catch (e) {
  //       null;
  //     }
  //   }
  //   setTimeout(() => {
  //     loadDataAsync();
  //   }, 100);
  // };

  useEffect(() => {
    makeProcstackdata();
    // console.log(
    //   ' on entering GAmescreen stackdata*********************************',
    // );
    // cfn.p(stackdata);

    // loadDayScore();

    return () => {
      setDSchangenotProc(true);
      setDay_score([]);
      // console.log(
      //   ' leaving GAmescreen >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      // );
    };
  }, []);

  // useEffect(() => {
  //   if (route.params?.stackdata) {
  //     console.log(
  //       ' on route.params stackdata*********************************',
  //     );
  //     stackdata ? cfn.p(stackdata) : null;
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //     if (stackdata && stackdata.length > 0) {
  //       // console.log('it is here 1', stackdata[0].name);
  //       if (stackdata[0].name) setProcstackdata(stackdata);
  //       else {
  //         console.log('it is here');
  //         // makeProcstackdata(stackdata);
  //         // checkNmakeStackdata();
  //         loadDayScore();
  //       }
  //       //It will trigger Day_score_useeffect
  //       // setProcstackdata(stackdata)
  //     } else {
  //       // console.log('it is somewhere here');
  //       checkNmakeStackdata();
  //       loadDayScore();
  //     }
  //     //  makeProcstackdata(route.params.stackdata);
  //     // checkNmakeStackdata();
  //     // loadDayScore();
  //     // else
  //   }

  // }, [route.params?.stackdata]);

  // const includeNamenSymb = mstackdata => {
  //   let myoperations = [];
  //   mstackdata.map(k => {
  //     var obj = operations.find(o => o.id == k.operation_id);
  //     console.log(obj);
  //     myoperations.push({
  //       ...k,
  //       name: obj['name'],
  //       operator: obj['operator'],
  //       user_id: k['user_id'] ? k['user_id'] : user.id,
  //       mistypes: 0,
  //       time_taken: 0,
  //       score: 0,
  //       num_problems_done: 0,
  //       passed: 0,
  //     });
  //   });
  //   return myoperations;
  // };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {procstackdata
            ? procstackdata.map(k => {
                // console.log('user in mysurface input', k);
                return (
                  <MySurface
                    key={Math.random().toString()}
                    // name={k.name}
                    // symbol={k.operator}
                    myprops={k}
                    myfunc={() => {
                      // console.log('user in mysurface comp', user);
                      return navigation.navigate('MathScreen', {
                        user: user,
                        totaldayscore: procstackdata
                          .map(b => b.score)
                          .reduce((b, c) => b + c),
                        stackdata: procstackdata,
                        operation: k,
                      });
                    }}
                  />
                );
              })
            : null}
          {/* <Text>{JSON.stringify(day_score)}</Text> */}
          {/* <Text>{JSON.stringify(procstackdata)}</Text> */}
          {/* <TouchableOpacity
            style={{backgroundColor: 'red'}}
            // style={styles.back}
            // onPress={() => console.log('clicked')}
            onPress={() => changedayscoredate()}>
            <Text>Change Dayscore</Text>
          </TouchableOpacity> */}
        </View>
        {/* <MyModal /> */}
        <ModalPaper />
      </ScrollView>
      {/* <TouchableOpacity
        key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() =>
          Alert.alert(
            'Want to change games and levels?',
            'Ask your mom or dad to do that',
            [
              {
                text: 'Yes',
                onPress: () => navigation.navigate('Users', {}),
                style: 'success',
              },
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
            ],
          )
        }
        style={{
          position: 'absolute',
          left: windowWidth / 2 - 40,
          bottom: 0,
          marginTop: 16,
          width: 80,
          height: 80,
          padding: 10,
          paddingTop: 20,
          backgroundColor: '#a60',
          borderRadius: 50,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Change Games
        </Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => {
          console.log('Day score');
          cfn.p(day_score);
        }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          marginTop: 16,
          width: 80,
          height: 80,
          padding: 10,
          paddingTop: 25,
          backgroundColor: '#a60',
          borderRadius: 50,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          D-score
        </Text>
      </TouchableOpacity> */}

      {/* <HomeButton navigation={navigation} /> */}
    </>
  );
};

export default GamesScreen;
