import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Button, Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {MySurface} from './MySurface';
import {createNavigator, TabRouter, SafeAreaView} from 'react-navigation';
import {Alert} from 'react-native';
// import {operations} from '../../Data/Data';
const cfn = require('../../Functions/ConsoleFunctions');
import {Modal} from 'react-native';
import {operations, constants} from '../../Data/Data';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {
  db,
  getData,
  storeData,
  truncateTable,
} from '../../Functions/SqlFunctions';
import {stackwise_day_score, stackwise_score} from '../../Data/Models';
import {TouchableOpacity, Dimensions} from 'react-native';
const ScoreFunctions = require('../../Functions/ScoreFunctions');
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
  const [subjects, setSubjects] = useState();

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

    let msubjects = ScoreFunctions.groupByKey(myoperations, 'subject');
    console.log(msubjects);
    setSubjects(msubjects);
    // setProcstackdata(myoperations);
  };

  useEffect(() => {
    makeProcstackdata();
    console.log('user in Gamescreenv1 ', user, route.params);
    // console.log(
    //   ' on entering GAmescreen stackdata*********************************',
    // );
    // cfn.p(stackdata);

    // loadDayScore();

    return () => {
      // setDSchangenotProc(true);
      // setDay_score([]);
      // console.log(
      //   ' leaving GAmescreen >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      // );
    };
  }, []);
  return (
    // <Text>Gamescreen</Text>

    subjects ? (
      <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
        {/* <Text>Subjects availaable</Text> */}
        <SidebarTabs user={user} subjects={subjects} navigation={navigation} />
      </SafeAreaView>
    ) : null
  );

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
                return (
                  <MySurface
                    key={Math.random().toString()}
                    myprops={k}
                    myfunc={() => {
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
        </View>
        <ModalPaper />
      </ScrollView>
    </>
  );
};

export default GamesScreen;

const SidebarTabs = ({user, subjects, navigation}) => {
  // const {routes, index} = navigation.state;
  const [index, setIndex] = useState(0);

  return (
    <>
      <View style={styles.tabContainer}>
        {Object.keys(subjects).map((subject, tabIndex) => {
          // console.log('tabIndex subject', tabIndex, subject, subjects[subject]);
          // const {routeName, params} = route;
          // const {icon, tabName} = params || {};
          const tabName = subject;
          const color = tabIndex === index ? 'white' : 'black';

          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(tabIndex);
                console.log(['Arun', 'Ved'][index]);
                console.log(
                  'tabIndex subject',
                  tabIndex,
                  subject,
                  subjects[subject],
                );
              }}
              style={styles.tab}
              key={subject}>
              {/* <FontAwesome
              name={subject}
              size={24}
              color={color}
              style={{marginRight: 10}}
            /> */}
              <View style={{flex: 1}}>
                <Text style={{color}}>{tabName}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TabContent
        user={user}
        // index={index}
        subject={subjects[Object.keys(subjects)[index]]}
        navigation={navigation}
      />
    </>
  );
};

const TabContent = ({user, subject, navigation}) => {
  useEffect(() => {
    console.log('subject', subject);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>{['Arun', 'Ved'][index]}</Text> */}
      {/* <Text>{JSON.stringify(subject)}</Text> */}
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {subject.map(k => {
            return (
              <MySurface
                key={Math.random().toString()}
                myprops={k}
                myfunc={() => {
                  return navigation.navigate('MathScreen', {
                    user: user,
                    // totaldayscore: procstackdata
                    //   .map(b => b.score)
                    //   .reduce((b, c) => b + c),
                    stackdata: subject,
                    operation: k,
                  });
                }}
              />
            );
          })}
        </View>
        <ModalPaper />
      </ScrollView>
    </View>
  );
};

// export default Home;

const styles = StyleSheet.create({
  header: {position: 'absolute', top: 0},
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    // borderRadius: 20,
    margin: 5,
    backgroundColor: 'transparent',
    // backgroundColor: 'pink',

    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  tabContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
    width: 100,
    backgroundColor: 'grey',
  },
});
