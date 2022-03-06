import React, {useEffect} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import {styles} from './Styles';
const ScoreBoard = ({totaldayscore, dayscore_parms, operation}) => {
  useEffect(() => {
    // console.log(
    //   ' dayscore_parms, operation in scoreboard ',
    //   totaldayscore,
    //   dayscore_parms,
    //   operation,
    // );
  }, []);
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.tinyLogo}
          source={require('./assets/gold-coins-slant.png')}
        />
        <View style={styles.coin_number_view}>
          <Text style={styles.coin_star_number}>000</Text>
        </View>
        <Image
          style={styles.tinyLogo}
          source={require('./assets/gold-star.png')}
        />
        <View style={styles.star_number_view}>
          <Text style={styles.coin_star_number}>00</Text>
        </View>
        <Badge
          status="error"
          value={operation.num_problems - dayscore_parms.total_done_problems}
        />
      </View>

      <ImageBackground
        style={styles.scoreboard}
        source={require('./assets/score-board.png')}>
        <Text style={{alignSelf: 'center', color: '#fff', paddingTop: 0}}>
          {totaldayscore}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default ScoreBoard;
