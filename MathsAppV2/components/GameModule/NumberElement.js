import React, {useEffect, useState} from 'react';
import {Text, View, Image, TextInput} from 'react-native';
// import {Checkmark} from 'react-checkmark'
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export const NumberElement = ({
  mystyles,
  randomnumbers,
  resnumber,
  operation,
}) => {
  const [procRandnumbers, setProcRandnumbers] = useState();
  const [lendnumbers, setLendnumbers] = useState();
  const arithops = [
    {name: 'Addition', operator: '+'},
    {name: 'Subtraction', operator: '−'},
    {name: 'Multiplication', operator: '×'},
    {name: 'Division', operator: '÷'},
    {name: 'Comparisons', operator: '='},
  ];
  useEffect(() => {
    let reslength = resnumber.toString().length;
    let nrandstrings = randomnumbers.map(k =>
      k.toString().length < reslength
        ? [
            ...new Array(reslength - k.toString().length).fill(''),
            ...k.toString().split(''),
          ]
        : k.toString().split(''),
    );

    // let nrandstrings = randomnumbers.map(k =>
    //   k.toString().length < reslength
    //     ? [
    //         ...new Array(reslength - k.toString().length).fill(''),
    //         ...k.toString().split(''),
    //       ]
    //     : k.toString().split(''),
    // );

    console.log(
      'nrandstrings reslength',
      nrandstrings,
      resnumber.toString(),
      randomnumbers[0].toString().length,
      reslength,
    );
    setProcRandnumbers(nrandstrings);
  }, [randomnumbers]);

  return procRandnumbers ? (
    <>
      <Text style={mystyles.abs_sign}>
        {arithops.filter(k => k.name == operation)[0]['operator']}
      </Text>
      {/* <Text style={mystyles.heading}> {randomnumbers[0]}{randomnumbers[1]}{randomnumbers[0]+randomnumbers[1]}  </Text> */}
      <View style={mystyles.intro}>
        {procRandnumbers[0].map(s => (
          <Text key={Math.random().toString()} style={mystyles.num}>
            {s}
          </Text>
        ))}
      </View>
      <View style={mystyles.intro}>
        {procRandnumbers[1].map(s => (
          <Text key={Math.random().toString()} style={mystyles.num}>
            {s}
          </Text>
        ))}
      </View>
      {procRandnumbers[1].length > randomnumbers[0].toString().length ? (
        <View style={mystyles.intro}>
          {procRandnumbers[1].map(s => (
            // <Text key={Math.random().toString()} style={mystyles.lendnumbers}>
            //   {s}
            // </Text>

            <TextInput
              pattern="[+-]?\d+(?:[.,]\d+)?"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={mystyles.lendnumbers}
              key={procRandnumbers[0][s] + s}
              defaultValue={''}
              editable={true}
            />
          ))}
        </View>
      ) : null}
    </>
  ) : null;
};
