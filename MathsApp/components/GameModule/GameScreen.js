import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {MySurface} from './MySurface';
import {Alert} from 'react-native';
// import {operations} from '../../Data/Data';
const cfn = require('../../Functions/ConsoleFunctions');
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
const GamesScreen = ({navigation, route}) => {
  const {user, stackdata} = route.params;
  const [procstackdata, setProcstackdata] = useState();
  const [day_score, setDay_score] = useState();
  const [day_score_change_not_processed, setDSchangenotProc] = useState(true);
  const [totaldayscore, setTotaldayscore] = useState();
  const table_day_score_object = {StackWiseDayScore: stackwise_day_score};
  const table_score_object = {StackWiseScore: stackwise_score};
  const [newstackdata, setNewstackdata] = useState();
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

  const makeProcstackdata = mstackdata => {
    // console.log('stackdata in makeProcstackdata...');
    console.log(' in makeProcstackdata mstackdata');
    cfn.p(mstackdata);
    var myoperations = [];
    if (mstackdata.length) {
      mstackdata.map(k => {
        var obj = operations.find(o => o.id == k.operation_id);
        console.log(obj);
        myoperations.push({
          ...k,
          name: obj['name'],
          operator: obj['operator'],
          user_id: k['user_id'] ? k['user_id'] : user.id,
          mistypes: 0,
          time_taken: 0,
          score: 0,
          num_problems_done: 0,
          passed: 0,
        });
      });
    } else {
      operations.slice(0, 3).map(k => {
        myoperations.push({
          ...k,
          user_id: user.id,
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
    }
    console.log(
      ' *********************************myoperations in makeProcstackdata...',
    );
    cfn.p(myoperations);

    setProcstackdata(myoperations);
  };

  const checkNmakeStackdata = () => {
    // console.log('stackdata  in checkNmakeStackdata', stackdata);
    if (!stackdata || (stackdata && stackdata.length == 0)) {
      let mstackdata = operations.slice(0, 3).map(k => ({
        ...k,
        level: 1,
        operation_id: k.id,
        num_problems: 10,
        user_id: user ? user.id : undefined,
        mistypes: 0,
        time_taken: 0,
        score: 0,
        num_problems_done: 0,
        passed: 0,
      }));
      if (day_score && day_score.length > 0)
        mstackdata = updatStackdataWDayscore(mstackdata, day_score);
      setProcstackdata(mstackdata);
    }
  };
  const updatStackdataWDayscore = (mystackdata, dayscore) => {
    let mstackdata = mystackdata.map(k => {
      let dayopscore = dayscore.find(
        ds =>
          ds.operation_id == k.operation_id &&
          ds.level == k.level &&
          ds.child_id == k.user_id,
      );

      return dayopscore
        ? {
            ...k,
            mistypes: dayopscore.mistypes,
            time_taken: dayopscore.time_taken,
            score: dayopscore.score,
            num_problems_done: dayopscore.num_problems_done,
            passed: dayopscore.passed,
          }
        : {
            ...k,
            mistypes: 0,
            time_taken: 0,
            score: 0,
            num_problems_done: 0,
            passed: 0,
          };
    });
    return mstackdata;
  };

  const loadDayScore = () => {
    async function loadDataAsync() {
      try {
        getData(
          db,
          'StackWiseDayScore',
          required_day_score_fields,
          setDay_score,
          'from setDay_score',
        );
        console.log('done inside get data ');
      } catch (e) {
        null;
      }
    }
    setTimeout(() => {
      loadDataAsync();
    }, 100);
  };

  const changedayscoredate = () => {
    console.log('in change dayscore data');
    let newdayscore = day_score.map(k => ({
      ...k,
      date: new Date('Fri Oct 08 2021').toDateString(),
    }));
    setDay_score(newdayscore);
    cfn.p(newdayscore);
  };

  useEffect(() => {
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

  useEffect(() => {
    if (route.params?.stackdata) {
      console.log(
        ' on route.params stackdata*********************************',
      );
      cfn.p(stackdata);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      if (stackdata && stackdata.length > 0) {
        // console.log('it is here 1', stackdata[0].name);
        if (stackdata[0].name) setProcstackdata(stackdata);
        else {
          console.log('it is here');
          // makeProcstackdata(stackdata);
          // checkNmakeStackdata();
          loadDayScore();
        }
        //It will trigger Day_score_useeffect
        // setProcstackdata(stackdata)
      } else {
        // console.log('it is somewhere here');
        checkNmakeStackdata();
        loadDayScore();
      }
      //  makeProcstackdata(route.params.stackdata);
      // checkNmakeStackdata();
      // loadDayScore();
      // else
    }
    return () => {
      setDSchangenotProc(true);
      setDay_score([]);
      // console.log(
      //   ' leaving GAmescreen >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      // );
    };
  }, [route.params?.stackdata]);
  const includeNamenSymb = mstackdata => {
    let myoperations = [];
    mstackdata.map(k => {
      var obj = operations.find(o => o.id == k.operation_id);
      console.log(obj);
      myoperations.push({
        ...k,
        name: obj['name'],
        operator: obj['operator'],
        user_id: k['user_id'] ? k['user_id'] : user.id,
        mistypes: 0,
        time_taken: 0,
        score: 0,
        num_problems_done: 0,
        passed: 0,
      });
    });
    return myoperations;
  };

  useEffect(() => {
    if (day_score_change_not_processed)
      if (day_score && day_score.length > 0) {
        console.log('in day_score useEffect (day_score) ');
        cfn.p(day_score);
        console.log('in day_score useEffect (stackdata) ');
        cfn.p(stackdata);
        if (
          new Date().toDateString() ==
          new Date(day_score[0].date).toDateString()
        ) {
          //&& day_score[0]
          console.log('day_score useEffect day_score');
          day_score ? cfn.p(day_score) : null;
          console.log('day_score useEffect procstackdata');
          procstackdata ? cfn.p(procstackdata) : null;
          console.log('day_score useEffect stackdata');
          cfn.p(stackdata);

          if (stackdata && stackdata.length > 0) {
            if (!stackdata[0].name) {
              let mstackdata = updatStackdataWDayscore(
                includeNamenSymb(stackdata),
                day_score,
              );
              setProcstackdata(mstackdata);
            } else {
              let mstackdata = updatStackdataWDayscore(stackdata, day_score);
              setProcstackdata(mstackdata);
            }
          } else {
            if (procstackdata) {
              let mstackdata = updatStackdataWDayscore(
                procstackdata,
                day_score,
              );
              setProcstackdata(mstackdata);
            }
          }

          // console.log(
          //   'mstackdata after in day_score useEffect process',
          //   mstackdata.map(b => b.score).reduce((b, c) => b + c),
          // );
          // cfn.p(mstackdata);

          // console.log(
          //   ' *********************************mstackdata after in day_score useEffect',
          // );
          // cfn.p(mstackdata);
        } else {
          console.log(' DAYSCORE DIFFERENT');
          setImmediate(() => {
            try {
              // truncateTable(db, table_score_object);
              storeData(
                db,
                Object.keys(table_score_object)[0],
                day_score.map(k => {
                  delete k.id;
                  return k;
                }),
                ['date'],
              );
              truncateTable(db, table_day_score_object);
              console.log('done inside get data ');
            } catch (e) {
              return 0;
            }
          }, 50);
          setImmediate(() => setDay_score([]), 10);
          setTimeout(() => makeProcstackdata(stackdata), 20);
        }
        setDSchangenotProc(false);
      }
  }, [day_score]);

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
      </ScrollView>
      <TouchableOpacity
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
      </TouchableOpacity>

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

      <HomeButton navigation={navigation} />
    </>
  );
};

export default GamesScreen;
