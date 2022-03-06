import React, {Component, useEffect} from 'react';
import {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
// import DynamicTabView from 'react-native-dynamic-tab-view';
// import SummaryChart from './SummaryChart';
import {
  db,
  getData,
  createTable,
  getDataWithextrafieldWithFilter,
} from '../../../Functions/SqlFunctions';
const ScoreFunctions = require('../../../Functions/ScoreFunctions');
import ChartSelection from './ChartSelection';
import {ScoreStats} from './ScoreStats';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StackItems from '../StackMake/StackItems';
import {operations} from '../../../Data/Data';
import {models} from '../../../Data/Models';
import HomeButton from '../../HomeButton';
import MyButton from '../../Registration/MyButton';
// import GameSelect from '../StackMake/GameSelect';
const Tab = createMaterialTopTabNavigator();

function SummaryChart({navigation, route}) {
  const {childid, childscore, stackdata, userdata} = route.params;
  const [lchildscore, setLchildscore] = useState();
  const [selected, setSelected] = useState();
  useEffect(() => {
    let sel = stackdata.some(l => l.user_id == childid)
      ? stackdata.filter(k => k.user_id == childid)
      : operations.slice(0, 3);

    let newstackdata = sel.map(k => {
      console.log('ooooooo', k);
      if (k.name) {
        return k;
      } else {
        // if (k.operation_id) {
        let op = operations.find(o => o.id == k.operation_id);
        k = {...k, name: op.name, operator: op.operator};
        console.log('kkkkkk ', k);
        return k;
        // }
      }
    });
    console.log('kkkkkk newstackdata', newstackdata);
    setSelected(newstackdata);

    // setSelected(sel);
    console.log(' sel in SummaryChart ', sel);
  }, [stackdata]);
  // useEffect(() => {
  //   childscore
  //     ? console.log(
  //         'childscore[childid] in SummaryChart',
  //         childid,
  //         // childscore[childid].length,
  //       )
  //     : null;
  // }, []);

  useEffect(() => {
    console.log('childscore[childid]  ', childscore[childid]);
    setLchildscore(childscore[childid]);
  }, []);

  // useEffect(() => {
  //   console.log('childid in SummaryChart', childid);
  //   let newstackdata = stackdata.map(k => {
  //     if (k.name) {
  //       return k;
  //     } else {
  //       let op = operations.filter(o => o.id == k.operation_id)[0];
  //       k = {...k, name: op.name, operator: op.operator};
  //       return k;
  //     }
  //   });
  //   setSelected(newstackdata);
  // }, [stackdata]);

  // stackdata
  //   ? console.log('childid, stackdata in summary chart ', childid, stackdata)
  //   : null;
  // return <StackItems selected={stackdata.slice(0, 3)} />;
  const formatinfo = {
    level: styles.level,
    probs: styles.probs,
    height: 50,
    width: 40,
    avtar_text_size: 15,
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {lchildscore ? <ScoreStats childscore={lchildscore} /> : null}
      {lchildscore ? <ChartSelection childscore={lchildscore} /> : null}
      <View styles={{flex: 1, height: '10%'}}>
        {selected ? console.log('in set bhagava stackites', selected) : null}
        {selected ? (
          <StackItems
            setSelected={setSelected}
            selected={selected.map(k => ({...k, user_id: childid}))}
            formatinfo={formatinfo}
          />
        ) : null}
      </View>
      {lchildscore ? (
        <MyButton
          title="Edit Games"
          color="green"
          width={150}
          customClick={() => {
            console.log(
              'selected,stackdata in progress Edit Games',
              selected,
              stackdata,
            );
            return navigation.navigate('StackScreen', {
              childid: childid,
              // setUserdata: setUserdata,
              userdata: userdata,
              stackdata:
                stackdata.length > 0
                  ? stackdata
                  : selected.map(k => ({...k, user_id: childid})),
              // setStackdata: setStackdata,
            });
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

function MyTabs({chid, userdata, childscore, stackdata}) {
  // var Otherdata = [
  //   'first string',
  //   'Second string',
  //   'Third string',
  //   'Third string',
  // ];
  // console.log(
  //   'Oject.keys in my tabs',
  //   childscore[userdata[chid].id].length,
  //   chid,
  //   Object.keys(childscore),
  //   userdata[chid],
  // );

  return userdata ? (
    <Tab.Navigator initialRouteName={userdata[chid].name}>
      {userdata.map(k => (
        <Tab.Screen
          key={k.name}
          name={k.name}
          component={SummaryChart}
          initialParams={{
            childid: k.id,
            childscore: childscore,
            stackdata: stackdata,
            // setStackdata: setStackdata,
            userdata: userdata,
          }}
          options={{tabBarLabel: k.name}}
        />
      ))}
    </Tab.Navigator>
  ) : null;
}

// const Progress = ({navigation, route}) => {
const Progress = ({navigation, chid, userdata, stackdata, setStackdata}) => {
  // const {userdata, setUserdata, stackdata, setStackdata} = route.params;

  // const [index, setIndex] = useState(0);
  // const [defaultIndex, seDefaultIndex] = useState(1);

  var colors = ['#d1e8e5', '#dfe8d1', '#e7d1e8', '#e8e7d1'];
  // const [stackdata, setStackdata] = useState();
  const [scoredata, setScoredata] = useState();
  const [dayscoredata, setDayScoredata] = useState();
  const [childscore, setChildscore] = useState();
  // const [childdata, setChilddata] = useState();

  useEffect(() => {
    stackdata
      ? console.log('childid, stackdata in summary chart ', stackdata)
      : null;
    console.log('chid in progress', chid);
    let newstackdata = stackdata.map(k => {
      if (k.name) {
        return k;
      } else {
        let op = operations.filter(o => o.id == k.operation_id)[0];
        k = {...k, name: op.name, operator: op.operator};
        return k;
      }
    });
    setStackdata(newstackdata);

    //   console.log('progress useeffect');

    //   async function loadDataAsync() {
    //     let temp = userdata
    //       .filter(e => e.ischild)
    //       .map(e => {
    //         e['title'] = e['name'];
    //         e['color'] = colors[e['id']];
    //         return e;
    //       });

    //     // console.log('temp', temp);
    //     setChilddata(temp);
    //   }
    //   setTimeout(() => {
    //     loadDataAsync();
    //   }, 100);
  }, []);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        getData(
          db,
          // 'Score',
          // 'StackWiseDayScore',
          'StackWiseScore',
          [
            'id',
            'child_id',
            'subject_id',
            'operation_id',
            'level',
            'date',
            'time_taken',
            'mistypes',
            'passed',
            'score',
            'num_problems_set',
            'num_problems_done',
          ],
          setScoredata,
          'from userhomescreen StackWiseScore',
        );
      } catch (e) {
        createTable(db, models);
      }
    }

    async function loadDayDataAsync() {
      try {
        getData(
          db,
          // 'Score',
          'StackWiseDayScore',
          // 'StackWiseScore',
          [
            'id',
            'child_id',
            'subject_id',
            'operation_id',
            'level',
            'date',
            'time_taken',
            'mistypes',
            'passed',
            'score',
            'num_problems_set',
            'num_problems_done',
          ],
          setDayScoredata,
          'from userhomescreen StackDayWiseScore',
        );
      } catch (e) {
        createTable(db, models);
      }
    }

    setTimeout(() => {
      loadDataAsync();
      loadDayDataAsync();
    }, 100);
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {
    async function loadDataAsync() {
      if (scoredata) {
        // console.log('scoredata ', Object.keys(attribute0));
        //This to be deleted when actual
        var attribute0 = ScoreFunctions.groupByKey(scoredata, 'child_id');
        // var newKey = 2;
        // var oldKey = 0;

        // delete Object.assign(attribute0, {[newKey]: attribute0[oldKey]})[
        //   oldKey
        // ];

        // console.log('attribute0 keys', Object.keys(attribute0));

        setChildscore(attribute0);
      }
    }
    setTimeout(() => loadDataAsync(), 100);
  }, [scoredata]);

  useEffect(() => {
    if (dayscoredata) {
      if (scoredata) {
        if (dayscoredata[0].date != scoredata.slice(-1).date) {
          setScoredata([...scoredata, ...dayscoredata]);
        }
      } else {
        setScoredata([...dayscoredata]);
      }
    }
  }, [dayscoredata]);

  // useEffect(() => {
  //   // deleteTable(db, tableobject);
  //   // deleteTable(db, tablestackobject);
  //   // console.log(models['Stack']);
  //   async function loadDataAsync() {
  //     // deleteTable(db, tablestackobject);
  //     // createTable(db, models);
  //     // storeInitialStack();

  //     try {
  //       getData(
  //         db,
  //         'Stack',
  //         [
  //           'id',
  //           'user_id',
  //           'operation_id',
  //           'date',
  //           'level',
  //           'parent_id',
  //           'num_problems',
  //         ],
  //         setStackdata,
  //         // 'stack_id', //maxval_key
  //         'from parentscreen Stack',
  //       );
  //       console.log('done inside get data from child and stackdata');
  //     } catch (e) {
  //       createTable(db, models);
  //     }
  //   }
  //   loadDataAsync();
  // }, []);

  onChangeTab = index => {};
  return childscore && stackdata && userdata ? (
    <>
      {/* <NavigationContainer> */}
      {console.log(
        'Object.keys(childscore) ',
        Object.keys(childscore),
        childscore,
      )}
      <MyTabs
        chid={chid}
        userdata={userdata}
        childscore={childscore}
        stackdata={stackdata}
        // setStackdata={setStackdata}
      />
      {/* <Text>Hello</Text> */}
      {/* <MyButton
        title="Set Stack"
        color="green"
        customClick={() => navigation.navigate('StackScreen')}
      /> */}
      {/* </NavigationContainer> */}
    </>
  ) : (
    <Text>Data not available</Text>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 16,
  },
  headerText: {
    color: 'black',
  },
  tabItemContainer: {
    backgroundColor: '#cf6bab',
  },
  level: {
    backgroundColor: 'skyblue',
    fontSize: 8,
    textAlign: 'center',
    // height: 30,
    borderRadius: 5,
    padding: 2,
    margin: 1,
    alignItems: 'center',
  },
  probs: {
    backgroundColor: '#ce79e8',
    textAlign: 'center',
    // height: 30,
    fontSize: 8,
    borderRadius: 5,
    padding: 2,
    margin: 1,
    alignItems: 'center',
  },
});
