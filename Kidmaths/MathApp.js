import React, {useState, useEffect, useRef} from 'react';
// import CatApp from './maths/components/CatApp';
import {NumberElement} from './NumberElement';
import {Result} from './Result';
import {styles} from './Styles';
import {getRandomNumbers, getArray} from './Functions/MathFunctions';
import {FAB} from 'react-native-paper';
import ScoreBoard from './ScoreBoard';
import SuccessScreen from './SuccessScreen';
import {datalimits} from './Data/Data';

// import {DialogComponent, DialogTitle} from 'react-native-dialog-component';
import {db, storeData} from './Functions/SqlFunctions';
import {initiation, operations, levels, required_score_keys} from './Data/Data';
// import * as Progress from 'react-native-progress';
import {
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
const user = {
  id: 0,
  name: 'Ved',
  dob: '03-07-16',
  sclass: '1st Class',
  dor: '03-07-19',
  coins: 30,
  ischild: true,
  last_accessed: false,
};

export const MathScreen = ({navigation, route}) => {
  const {
    // stackdata,
    operation,
    totaldayscore,
    criticalscores,
    problem_number,
    level,
    // navscore,
  } = route.params;
  const total_problem_per_level = datalimits.total_problem_per_level;
  const [total_dayscore_in_mathapp, setTotaldayscoreinmathapp] = useState();
  const [score, setScoredata] = useState(); //{id: null, name: 'Notset', ischild: false},
  const [myproblem_number, setMyproblem_number] = useState(problem_number);
  const [firstopen, setFirstopen] = useState();
  let randnumbs = 0;
  let resnumber = 0;
  let nrdigits = 0;
  // const[local_operation,setLocalOperation]=useState()
  const [dayscore_parms, setDayscoreparams] = useState({
    total_time_sofar: 0,
    total_mistypes_sofar: 0,
    total_score_sofar: 0,
    total_passed_sofar: 0,
    total_done_problems: 0,
  });

  var localperations = {};
  operations.map(k => (localperations[k.name] = k.id));
  // var firstscores = [];

  const print = myarray => {
    myarray.map(k => console.log(k, ','));
  };
  const [today_score, setTodayscore] = useState(0);
  const [start_time, setstart_time] = useState(new Date());
  const [completion_time, setcompletion_time] = useState(new Date());
  var complettion_time_ = new Date();
  const [_c, set_c] = useState(1);
  const [prob_score, setProbscore] = useState(initiation.prob_score);
  const [mistypes, setMistypes] = useState(0);
  const [randomnumbers, setrandomnumbers] = useState([]);
  const [resultnumber, setresultnumber] = useState();
  const [guessdigits, setguessdigits] = useState();
  const [isRightGuesses, setisRightGuesses] = useState();

  const ctx = {};
  // useEffect(() => {

  const ResultNumber = (randnumbs, operation_name) => {
    let resnumber = 0;
    switch (operation_name) {
      case 'Addition':
        resnumber = randnumbs[0] + randnumbs[1];
        break;
      case 'Subtraction':
        resnumber = randnumbs[0] - randnumbs[1];
        break;
      case 'Multiplication':
        resnumber = randnumbs[0] * randnumbs[1];
        break;
      default:
        resnumber = 0;
    }
    return resnumber;
  };

  const getCriticalScores = () => {
    const score = {
      problem_number: myproblem_number,
      // child_id: user.id,
      // subject_id: 0,
      operation_id: operation.operation_id,
      level: level,
      date: start_time.toJSON(),
      time_taken: (complettion_time_ - start_time) / 1000,
      mistypes: mistypes,
    };
    score['score'] = prob_score;
    score['passed'] = prob_score >= initiation.pass_score ? true : false;

    let total_time_sofar =
      dayscore_parms.total_time_sofar + (complettion_time_ - start_time) / 1000;
    let total_done_problems = dayscore_parms.total_done_problems + 1;
    let total_mistypes_sofar = dayscore_parms.total_mistypes_sofar + mistypes;
    let total_score_sofar = dayscore_parms.total_score_sofar + prob_score;
    let npassed = 0;
    prob_score >= initiation.pass_score ? (npassed = 1) : (npassed = 0);
    let total_passed_sofar = dayscore_parms.total_passed_sofar + npassed;

    const dayscore_parms_ = {
      total_time_sofar: total_time_sofar,
      total_mistypes_sofar: total_mistypes_sofar,
      total_score_sofar: total_score_sofar,
      total_passed_sofar: total_passed_sofar,
      total_done_problems: total_done_problems,
    };
    let cum_score = total_dayscore_in_mathapp + prob_score;
    const day_score = {
      id: operation.id,
      child_id: user.id,
      subject_id: 0,
      operation_id: operation.operation_id,

      level: level,
      date: start_time.toDateString(),
      time_taken: total_time_sofar,
      mistypes: total_mistypes_sofar,
      score: total_score_sofar,
      passed: total_passed_sofar, //+ (prob_score >= initiation.pass_score),
      num_problems_set: operation.num_problems,
      num_problems_done: total_done_problems,
    };

    return {
      score: score,
      dayscore_parms_: dayscore_parms_,
      cum_score: cum_score,
      day_score: day_score,
    };
  };

  const storeScores = () => {
    complettion_time_ = new Date();
    const criticalscores = getCriticalScores();
    setTotaldayscoreinmathapp(criticalscores.cum_score);
    setDayscoreparams(criticalscores.dayscore_parms_);
    // console.log('criticalscores.score   ', criticalscores.score);
    var req_score = {};
    required_score_keys.map(k => {
      req_score[k] = criticalscores.score[k];
    });
    console.log(
      'dayscore_parms.total_done_problems',
      dayscore_parms.total_done_problems,
    );
    // navscore = [...navscore, req_score];
    // setLocnavScore([...navscore, req_score]);

    storeData(db, 'Score', {...criticalscores.score}, ['date']);

    console.log(
      'in storeScores',
      start_time.toTimeString(),
      complettion_time_.toTimeString(),
    );
    // }, 100);
  };

  function refreshPage() {
    randnumbs = getRandomNumbers(level, operation.name);
    resnumber = ResultNumber(randnumbs, operation.name);
    nrdigits = resnumber.toString().length;
    setrandomnumbers(randnumbs);
    setresultnumber(resnumber);
    setguessdigits(new Array(nrdigits).fill(0));
    setisRightGuesses(new Array(nrdigits).fill(false));
    setMistypes(0);
    // setFinalProbscore(prob_score);
    // console.log('today_score+prob_score ', today_score + prob_score);
    setTodayscore(today_score + prob_score);
    setProbscore(100);
    setstart_time(new Date());
    setMyproblem_number(myproblem_number + 1);
    // return () => clearTimeout(timer);
  }

  const onBack = () => {
    setrandomnumbers([]);
    return navigation.goBack();
  };

  const initiateParams = () => {
    setDayscoreparams({
      total_time_sofar: operation.time_taken,
      total_mistypes_sofar: operation.mistypes,
      total_score_sofar: operation.score,
      total_passed_sofar: operation.passed,
      total_done_problems: operation.num_problems_done,
    });

    setTotaldayscoreinmathapp(totaldayscore);
    refreshPage();
  };

  useEffect(() => {
    console.log(
      'Entering mathapp useEffect#################################################',
    );
    // console.log(route.params);
    initiateParams();
  }, []);
  useEffect(() => {
    if (route.params?.criticalscores) {
      // console.log(' route params firstopen', firstopen, user, criticalscores);

      if (!firstopen) {
        console.log(' {...criticalscores.score, child_id: user.id}', {
          ...criticalscores.score,
          child_id: user.id,
        });
        setTotaldayscoreinmathapp(criticalscores.cum_score);
        setDayscoreparams(criticalscores.dayscore_parms_);
        setFirstopen(false);
      }
    }
  }, [route.params?.criticalscores]);

  // return <Text>Hey</Text>;
  return isRightGuesses ? (
    <ImageBackground
      source={require('./assets/dark_bg.png')}
      style={{width: '100%', height: '100%'}}>
      {/* <Progress.Bar progress={0.3} width={200} /> */}
      <View style={styles.container}>
        <View style={{height: 50}}>
          <Text style={styles.heading}>{operation.name}</Text>
        </View>

        <View style={styles.line} />
        {dayscore_parms.total_done_problems == operation.num_problems ? (
          <SuccessScreen />
        ) : (
          <View style={styles.mathcontainer}>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <Text>Points:</Text>
              <Text style={styles.prob_score}>{prob_score}</Text>
              <Text>mistypes: {mistypes}</Text>
            </View>
            <ImageBackground
              imageStyle={{borderRadius: 15}}
              source={require('./assets/dark-black-vector-background.jpg')}
              resizeMode="cover"
              style={{width: '100%', height: 350}}>
              {randomnumbers.length > 0 ? (
                <View style={{top: -50}}>
                  <NumberElement
                    mystyles={styles}
                    randomnumbers={randomnumbers}
                    resnumber={resultnumber}
                    operation={operation.name}
                  />
                  <View style={styles.line50} />
                  <KeyboardAvoidingView
                    behavior="padding"
                    style={{justifyContent: 'center', height: '45%'}}>
                    <Result
                      mystyles={styles}
                      levels={levels}
                      randomnumbers={randomnumbers}
                      resultnumber={resultnumber}
                      storeScores={storeScores}
                      resinput={{
                        guessdigits: guessdigits,
                        setguessdigits: setguessdigits,
                        isRightGuesses: isRightGuesses,
                        setisRightGuesses: setisRightGuesses,
                        completiontime: completion_time,
                        setcompletiontime: setcompletion_time,
                        mistypes: mistypes,
                        setMistypes: setMistypes,
                        setProbscore: setProbscore,
                      }}
                    />
                  </KeyboardAvoidingView>
                </View>
              ) : null}
            </ImageBackground>
          </View>
        )}
      </View>

      {/* <Fireworks /> */}

      <View style={styles.score}>
        <View style={styles.levelfab}>
          <Text style={{alignSelf: 'center', fontSize: 15}}>
            {'Level ' + level}
          </Text>
        </View>
        {total_dayscore_in_mathapp ? (
          <ScoreBoard
            totaldayscore={total_dayscore_in_mathapp}
            dayscore_parms={dayscore_parms}
            operation={operation}
          />
        ) : null}
      </View>
      {problem_number < datalimits.total_problem_per_level ? (
        <FAB
          style={styles.fab}
          medium
          icon=""
          label="Next"
          onPress={refreshPage}
          disabled={!isRightGuesses.every(v => v === true)}
        />
      ) : null}
      {/* {dayscore_parms.total_done_problems != operation.num_problems ? (
        <FAB
          style={styles.fab}
          medium
          icon=""
          label="Next"
          onPress={refreshPage}
          disabled={!isRightGuesses.every(v => v === true)}
        />
      ) : null} */}
      <TouchableOpacity
        key={Math.random().toString()}
        accessibilityRole="button"
        onPress={() => onBack()}
        style={{...styles.back}}>
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '700'}}>
          {'Back'}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  ) : null;
};
