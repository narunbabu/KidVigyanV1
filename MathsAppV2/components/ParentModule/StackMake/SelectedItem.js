import React, {useState, useEffect} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import {Card, Badge, Avatar, Colors, Paragraph} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// import {Icon} from 'react-native-eva-icons';
// import {colors} from 'react-native-elements';

const SelectedItem = ({item, myFunc, formatinfo}) => {
  // const CloseIcon = () => <Icon name="close-circle-outline" />;
  // const CheckIcon = () => (
  //   <Icon name="checkmark-circle-2-outline" fill="green" />
  // );
  // const iconRef = React.useRef();
  // console.log('item in selecteditem ', item);
  return (
    <View
      style={{
        backgroundColor: '#abcdf5',
        padding: 2,
        marginTop: 20,
        marginRight: 8,
        borderRadius: 10,
      }}>
      <View
        style={
          (styles.card,
          formatinfo
            ? {height: formatinfo.height, width: formatinfo.width}
            : null)
        }>
        <View style={{alignItems: 'center'}}>
          <Avatar.Text
            size={formatinfo ? formatinfo.avtar_text_size : 30}
            label={item.operator}
            color={Colors.red200}
          />
        </View>
        <Text style={formatinfo ? formatinfo.level : styles.level}>
          Level: {item.level}
        </Text>
        <Text style={formatinfo ? formatinfo.probs : styles.probs}>
          Probs: {item.num_problems}
        </Text>
        {formatinfo ? null : (
          <View style={styles.deletefromstack}>
            <TouchableHighlight
              // style={styles.deletefromstack}
              onPress={() => myFunc(item)}>
              {/* <Text>x</Text> */}
              {/* <Avatar.Text
              size={20}
              fontSize={20}
              label={'x'}
              color={'black'}
              backgroundColor={'red'}
            /> */}
              <Badge size={25}>x</Badge>

              {/* <Avatar.Icon size={12} icon="folder" /> */}
            </TouchableHighlight>
          </View>
          //
          //   <Avatar.Text size={20} label={'x'} color={Colors.blue200} />
          //
        )}
      </View>
    </View>
  );
};

export default SelectedItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    padding: 1,
    height: 100,
    width: windowWidth / 5,
    justifyContent: 'space-between',
    backgroundColor: 'red',
    borderRadius: 20,
    alignContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  level: {
    backgroundColor: 'skyblue',
    fontSize: 12,
    textAlign: 'center',
    // height: 30,
    borderRadius: 10,
    padding: 2,
    margin: 1,
    alignItems: 'center',
  },
  probs: {
    backgroundColor: '#ce79e8',
    textAlign: 'center',
    // height: 30,
    fontSize: 10,
    borderRadius: 10,
    padding: 2,
    margin: 1,
    alignItems: 'center',
  },
  deletefromstack: {
    position: 'absolute',
    width: 25,
    height: 25,
    right: -8,
    top: -8,
    // marginTop: 0,
    paddingTop: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
});
