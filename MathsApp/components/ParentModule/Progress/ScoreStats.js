import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
const ScoreFunctions = require('../../../Functions/ScoreFunctions');

export const ScoreStats = ({childscore}) => {
  const totalnum_problems_done = ScoreFunctions.Sum(
    childscore.map(k => k.num_problems_done),
  );
  const totalscore = ScoreFunctions.Sum(childscore.map(k => k.score));
  let hrs = ScoreFunctions.Sum(childscore.map(k => k.time_taken));
  let minpart = hrs % 3600;

  const totaltime_spent =
    (hrs > 3600 ? Math.round(hrs / 3600) + 'h:' : null) +
    Math.round(minpart / 60) +
    'm';
  // (minpart % 60) +
  // ':';
  // Math.round(ScoreFunctions.Sum(childscore.map(k => k.time_taken)) / 36) /
  // 100;
  const total_mistypes =
    Math.round(
      (100 * ScoreFunctions.Sum(childscore.map(k => k.mistypes))) /
        totalnum_problems_done,
    ) / 100;
  // const pass_perc = Math.round(
  //   (ScoreFunctions.Sum(childscore.map(k => k.passed)) * 100) /
  //     totalnum_problems_done,
  // );
  const pass_perc = Math.round(totalscore / totalnum_problems_done);
  // useEffect(() => {
  //   console.log(' child score in scorestats ', childscore);
  // }, []);

  return (
    // <View style={{margin: 2}}>
    <View style={styles.container}>
      <View style={styles.secondorderitem}>
        <Text style={styles.text}>Problems</Text>
        <Text style={styles.dropdown}>
          {ScoreFunctions.Sum(childscore.map(k => k.num_problems_done))}
        </Text>
      </View>

      <View style={styles.secondorderitem}>
        <Text style={styles.text}>Score</Text>
        <Text style={styles.dropdown}>{totalscore}</Text>
      </View>

      <View style={styles.secondorderitem}>
        <Text style={styles.text}>Time Spent</Text>
        <Text style={styles.dropdown}>{totaltime_spent}</Text>
      </View>

      <View style={styles.secondorderitem}>
        <Text style={styles.text}>Mistypes</Text>
        <Text style={styles.dropdown}>{total_mistypes}</Text>
      </View>

      <View style={styles.secondorderitem}>
        <Text style={styles.text}>Grade</Text>
        <Text style={styles.dropdown}>{pass_perc}%</Text>
      </View>
    </View>
    // </View>
  );
};

// export default ScoreStats;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#9ce6b8',
    height: '12%',
    borderRadius: 20,
    margin: 1,
    padding: 5,
    paddingTop: 2,
    borderColor: 'grey',
    borderWidth: 5,
  },

  // container: {
  //   flex: 1,
  //   // flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#ddede2', // '#9ce6b8',
  //   // height: '12%',
  //   borderRadius: 20,
  //   margin: 1,
  //   padding: 5,
  //   paddingTop: 2,
  //   borderColor: 'grey',
  //   borderWidth: 5,
  // },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },

  dropdown: {
    width: 60,
    height: 25,
    textAlign: 'center',
    backgroundColor: '#e66f4e',
    paddingTop: 5,
    marginTop: 5,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 12,
  },
  input: {
    width: 30,
    height: 30,
    // left: 0,
    // bottom: 0,
    // margin: 16,
    backgroundColor: '#e4eba9',
    padding: 2,
    borderColor: '#75714d',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    // alignSelf: 'center',
    fontSize: 15,
    // alignItems: 'center',
  },
  secondorderitem: {
    alignItems: 'center',
    marginTop: 1,
    // width: 40,
    // height: 30,
  },
});
