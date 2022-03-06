import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import TileCompleted from './TileCompleted';
import {getAllwithMultiKeyValue} from './Functions/ScoreFunctions';
import {getArray} from './Functions/MathFunctions';
import {useState, useEffect} from 'react';
import {datalimits} from './Data/Data';
import {tilesound} from './audio';
function StarsCalc(singlescore) {
  var coeff = singlescore.score / 10 + 40 / Math.pow(singlescore.time_taken, 3);
  var val = coeff / 4;
  var nstars = val < 3 ? Math.round(val) : 3;
  var halfstars = (nstars < 3) & (val - nstars > 0.3) ? 1 : 0;
  //   console.log(val, nstars, halfstars);
  return [nstars, halfstars];
}
const TileGrid = ({navigation, operation, score, level, styles}) => {
  const total_problem_per_level = datalimits.total_problem_per_level;
  const [localScore, setLocalScore] = useState();
  const [prev_level_score, setPrevLevelscore] = useState(0);

  const [completed_problems, setCompleted_problems] = useState(); //{id: null, name: 'Notset', ischild: false},
  const [stars, setStars] = useState();
  useEffect(() => {
    console.log('how many times......');
    console.log('level:', level);
    var lscore = getAllwithMultiKeyValue(score, {
      level: level,
      operation_id: operation.operation_id,
    });

    var prevlscore =
      lscore.length == 0
        ? getAllwithMultiKeyValue(score, {
            level: level - 1,
            operation_id: operation.operation_id,
          }).length
        : 11;
    console.log(
      'total_problem_per_level, completed_problems , 1',
      total_problem_per_level,
      completed_problems,
      1,
    );
    level > 0 ? setPrevLevelscore(prevlscore) : setPrevLevelscore(11);

    setLocalScore(lscore);
    score ? setCompleted_problems(score.length) : setCompleted_problems(0);
    score ? setStars(score.map(k => StarsCalc(k))) : null;
  }, [level, score]);

  useEffect(() => {
    console.log(
      'localscore..',
      // localScore,
      // stars,
      // completed_problems,
      //   total_problem_per_level - completed_problems - 1,
    );
    localScore
      ? setCompleted_problems(localScore.length)
      : setCompleted_problems(0);
    localScore ? setStars(localScore.map(k => StarsCalc(k))) : setStars([0, 0]);
  }, [localScore]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Completed problems {completed_problems}</Text> */}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {completed_problems ? (
          completed_problems != 1 ? (
            Array.apply(0, Array(completed_problems).fill(0))
              .map((_, b) => b)
              .map(k => {
                return (
                  <TileCompleted
                    key={1099999 + k}
                    navigation={navigation}
                    k={k}
                    stars={stars}
                    styles={styles}
                  />
                );
              })
          ) : (
            <TileCompleted
              key={1089999}
              navigation={navigation}
              k={0}
              stars={stars}
              styles={styles}
            />
          )
        ) : null}
        {
          prev_level_score > 9 ? (
            <TouchableHighlight
              key={completed_problems + 1}
              onPress={() => {
                console.log('pressed');
                tilesound.stop();
                return navigation.navigate('MathScreen', {
                  operation: operation,
                  level: level,
                  totaldayscore: 0,
                  problem_number: completed_problems + 1,
                  navscore: score,
                });
              }}>
              <ImageBackground
                key={completed_problems + 1}
                source={require('./assets/game_unlocked.png')}
                style={styles.tile}>
                <Text>{completed_problems + 1}</Text>
              </ImageBackground>
            </TouchableHighlight>
          ) : null
          // (
          //   <Text>Complete atleast 10 games in previous level</Text>
          // )
        }

        {stars
          ? getArray(total_problem_per_level - completed_problems - 1).map(
              k => (
                <ImageBackground
                  key={completed_problems + 2 + k}
                  source={require('./assets/game_locked.png')}
                  style={styles.tile}>
                  {/* <Text>{completed_problems + 2 + k}</Text> */}
                </ImageBackground>
              ),
            )
          : null}
        {/**/}
        {/**/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TileGrid;
