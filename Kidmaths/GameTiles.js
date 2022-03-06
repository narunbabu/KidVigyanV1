import React from 'react';
import {
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useState, useEffect} from 'react';
import {db, getData} from './Functions/SqlFunctions';
import {operations, required_score_keys} from './Data/Data';
import LevelComp from './Level';
import {Dimensions} from 'react-native';
import TileGrid from './TileGrid';
import {tilesound} from './audio';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GameTilesScreen = ({navigation, route}) => {
  const [score, setScoredata] = useState(); //{id: null, name: 'Notset', ischild: false},

  // useEffect(() => {
  //   // console.log('route.params in Gametilescreen...', route.params.ext_score);
  //   if (route.params?.ext_score) {
  //     setScoredata(route.params.ext_score);
  //     console.log(
  //       'route.params in Gametilescreen...',
  //       route.params.ext_score[route.params.ext_score.length - 1],
  //     );
  //   }
  // }, [route.params?.ext_score]);
  //   return (
  //     <GameTilesApp
  //       navigation={navigation}
  //       operation={route.params.operation}
  //       level={route.params.level}
  //       score={route.params.ext_score}
  //     />
  //   ); //
  // };

  // const GameTilesApp = ({navigation, operation, level, ext_score}) => {
  // var completed_problems = 10;
  const {operation, level, ext_score} = route.params;

  const [level_tileapp, setLevelTileapp] = useState(level);
  const [levelupdated, setLevelUpdated] = useState(false);

  const onBack = () => {
    // setTimeout(() => loadDataAsync(), 20);
    tilesound.stop();
    return navigation.navigate('MathTopicsScreen');
  };
  const onLevelDown = () => {
    setLevelTileapp(level_tileapp > 0 ? level_tileapp - 1 : level_tileapp);
    console.log('in level down');
  };
  const onLevelUp = () => {
    setLevelTileapp(level_tileapp < 4 ? level_tileapp + 1 : level_tileapp);
    console.log('in level up');
  };
  useEffect(() => {
    console.log('operation...', level_tileapp, operation);
    async function loadDataAsync() {
      try {
        getData(
          db,
          'Score',
          required_score_keys,
          setScoredata,
          'from userhomescreen',
        );
      } catch (e) {
        console.log('Not loaded userdata');
        // createTable(db, models);
        // getColumns(db, 'Score');
      }
    }
    setTimeout(() => loadDataAsync(), 20);
    tilesound.play();
    const willFocusSubscription = navigation.addListener('focus', () => {
      setTimeout(() => loadDataAsync(), 20);
      tilesound.play();
    });
    return willFocusSubscription;
  }, []);

  useEffect(() => {
    // console.log('score', score);
    // if (!levelupdated) {
    score ? setLevelTileapp(score[score.length - 1].level) : null;
    setLevelUpdated(true);
    // }
  }, [score]);

  return (
    <ImageBackground
      source={require('./assets/game_background.png')}
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={require('./assets/title_banner.png')}
        style={{
          ...styles.title,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: -5,
          alignSelf: 'center',
          height: 50,
          width: 400,
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', padding: 0}}>
          {operation.name}
        </Text>
      </ImageBackground>

      {score ? (
        <TileGrid
          navigation={navigation}
          operation={operation}
          score={score}
          level={level_tileapp}
          styles={styles}
        />
      ) : (
        <TileGrid
          navigation={navigation}
          operation={operation}
          score={[{pid: 0, level: 0}]}
          level={0}
          styles={styles}
        />
      )}

      <TouchableOpacity
        key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => onBack()}
        style={{...styles.back}}>
        {/* <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          {'Back'}
        </Text> */}
        <Image
          key={Math.random.toString()}
          source={require('./assets/arrow_back.png')}
          style={styles.back}
        />
      </TouchableOpacity>

      <Image
        key={Math.random().toString()}
        source={require('./assets/arrow_next.png')}
        style={styles.next}
      />
      <LevelComp
        style={styles.levelapp}
        onLevelDown={onLevelDown}
        onLevelUp={onLevelUp}
        level={level_tileapp}
        // setLevelapp={setLevelTileapp}
      />
    </ImageBackground>
  );
};

export default GameTilesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    // paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ebfaa2',
    margin: 10,
    // borderColor: '#f5894e',
    // borderStyle: 'solid',
    // borderWidth: 5,
    // borderRadius: 20,
    // marginBottom: 50,
  },
  container: {
    flex: 1,
    // paddingBottom: 80,
    // borderColor: '#f5894e',
    // borderStyle: 'solid',
    // borderWidth: 5,
    borderRadius: 20,
    margin: 10,
    marginBottom: 60,
    // paddingTop: StatusBar.currentHeight,
  },
  tile: {
    width: 50,
    height: 50,
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 200,
    height: 40,
    margin: 5,
    padding: 5,
  },
  next: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 0,
    bottom: 0,
    margin: 5,
  },
  back: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 0,
    bottom: 0,
    margin: 5,
  },
  levelapp: {
    position: 'absolute',
    width: 200,
    height: 50,
    right: windowWidth / 4,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 5,
  },
});
