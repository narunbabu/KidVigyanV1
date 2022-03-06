import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {initiation} from '../../Data/Data';
let resdigits = [0, 0];
export const Result = ({
  mystyles,
  levels,
  storeScores,
  randomnumbers,
  resultnumber,
  resinput,
}) => {
  const CheckIcon = () => (
    <Icon name="checkmark-circle-2-outline" fill="green" />
  );

  // const [isRightGuesses, setisRightGuesses] = useState();
  const [allright, setAllright] = useState(false);
  const [localmistypes, setLocalmistypes] = useState(0);
  const [resfielddigits, setResfielddigits] = useState(
    new Array(resinput.guessdigits.length).fill(''),
  );
  const [seqarray, setSeqarray] = useState([]);
  let guessdigits = [...resinput.guessdigits];
  let isRightGuesses = [...resinput.isRightGuesses];
  let nrdigits = resinput.guessdigits.length;
  let mydigits = [...resinput.guessdigits];
  // let seqarray = [];

  useEffect(() => {
    setLocalmistypes(0);
    setAllright(false);
    resdigits = resultnumber.toString().split('').map(Number);

    guessdigits = [...resinput.guessdigits];
    isRightGuesses = [...resinput.isRightGuesses];
    setResfielddigits(new Array(resinput.guessdigits.length).fill(''));
    setLocalmistypes(0);

    nrdigits = guessdigits.length;
    setSeqarray(
      nrdigits > 1
        ? Array.apply(0, Array(nrdigits).fill(0)).map((_, b) => b)
        : [0],
    );
    console.log(
      'resdigits, nrdigits,seqarray in result',
      resdigits,
      nrdigits,
      seqarray,
    );
  }, [randomnumbers]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(
      //   'allright,localmistypes',
      //   allright,
      //   localmistypes => localmistypes,
      // );
      resinput.setProbscore(prob_score => {
        if (prob_score > 0) return prob_score - initiation.score_reduce_pertime;
        else {
          clearInterval(interval);
          return 0;
        }
      });
      allright ? clearInterval(interval) : null;
    }, initiation.time_unit);

    return () => clearInterval(interval);
  }, [allright]);

  useEffect(() => {
    localmistypes > 0
      ? resinput.setProbscore(
          prob_score => prob_score - initiation.score_reduce_permistype,
        )
      : null;
  }, [localmistypes]);

  const bigaddDigit = (digit, k) => {
    addDigit(digit, k);

    // console.log('later bigguessdigits in result', resinput.guessdigits,guessdigits)
    // console.log('bigaddDigit resdigits: ', resdigits.join(','));
  };
  const checkifRightGuess = (guess, result) => guess == result;
  const addDigit = (digit, k) => {
    mydigits = [...guessdigits]; // copying the old datas array

    mydigits[k] = digit * 1;

    guessdigits = mydigits;

    let istureGuesses = isRightGuesses;
    // console.log('k and resdigits', k, mydigits[k], resdigits.join(','));
    let _resfielddigits = [...resfielddigits];

    istureGuesses[k] = checkifRightGuess(mydigits[k], resdigits[k]);

    if (istureGuesses.every(v => v === true)) {
      resinput.setcompletiontime(new Date());
      setAllright(true);
      console.log('in add digit before storescore');

      storeScores();
    }

    if (!istureGuesses[k]) {
      let mistypes = resinput.mistypes + 1;
      resinput.setMistypes(mistypes);

      setLocalmistypes(mistypes);
    } else {
      _resfielddigits[k] = mydigits[k];
      setResfielddigits(_resfielddigits);
    }

    console.log('istureGuesses', istureGuesses);

    // setisRightGuesses([...istureGuesses]);
    isRightGuesses = istureGuesses;
    resinput.setisRightGuesses([...istureGuesses]);
    resinput.setguessdigits(mydigits);
  };

  return (
    <>
      <View style={mystyles.intro}>
        {seqarray.map(k => {
          console.log(
            'in map',
            k,
            guessdigits,
            k + resdigits.reduce((a, b) => a + b),
            // resfielddigits[k].toString(),
            // !isRightGuesses[k],
          );
          return (
            <TextInput
              pattern="[+-]?\d+(?:[.,]\d+)?"
              keyboardType="numeric"
              style={mystyles.input}
              key={k + guessdigits.reduce((a, b) => a + b)}
              onChangeText={digit => bigaddDigit(digit, k)}
              value={resfielddigits[k].toString()}
              editable={!isRightGuesses[k]}
              autoFocus={true}
            />
          );
        })}
      </View>
      <View style={mystyles.line50} />
      <View style={mystyles.intro}>
        {seqarray.map(k => (
          <View style={mystyles.num} key={String(k)}>
            {isRightGuesses[k] ? <CheckIcon width={50} height={50} /> : null}
          </View>
        ))}
      </View>
    </>
  );
};
