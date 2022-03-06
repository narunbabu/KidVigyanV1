import {Text, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {styles} from './Styles';
import {FlatList} from 'react-native';

const ChildrenComp = ({navigation, userdata, stackdata}) => {
  const [childrendata, setChildrendata] = useState(null);
  // let localstackdata=[]

  // console.log(
  //   'stackdata in childrencomp ',
  //   stackdata.filter(s => s.user_id == userdata[0].id),
  // );

  // useEffect(() => {
  //   console.log('childrencomp stackdata', stackdata);
  // }, []);

  const Item = ({item, stackdata}) =>
    item.ischild ? (
      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          if (stackdata.length == 1) {
            if (!stackdata.user_id)
              var localstackdata = [
                {
                  ...stackdata[0],
                  user_id: item.id,
                  operation_id: stackdata[0].id,
                },
              ];
          } else
            var localstackdata = stackdata.filter(s => s.user_id == item.id);
          console.log('localstackdata before gamescreen', localstackdata);
          return navigation.navigate('GamesScreen', {
            user: item,
            stackdata: localstackdata,
            // setStackdata: setStackdata,
          });
        }}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableHighlight>
    ) : null;

  const renderItem = ({item}) => <Item item={item} stackdata={stackdata} />;

  //   console.log('in isuserdatadataloaded', userdata);
  //   useEffect(() => {
  //     if (isuserdatadataloaded) {
  //       console.log('userdata in children comp  ', userdata);
  //       userdata.filter(k => k.ischild == true).length > 0
  //         ? setChildrendata(userdata.filter(k => k.ischild)[0])
  //         : null;
  //     }
  //   }, [userdata]);

  return (
    <FlatList
      style={{flex: 1}}
      data={userdata}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default ChildrenComp;
