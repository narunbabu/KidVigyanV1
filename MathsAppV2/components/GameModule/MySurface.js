import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Avatar, Colors, Paragraph} from 'react-native-paper';
import {Badge, withBadge} from 'react-native-elements';
import {Icon} from 'react-native-eva-icons';
export const MySurface = ({myprops, myfunc}) => {
  [value, setValue] = useState('Look here');
  const CheckIcon = () => (
    <Icon name="checkmark-circle-2-outline" fill="green" />
  );
  useEffect(() => {
    // console.log('myprops ie operation in mY surface', myprops);
  }, []);
  return (
    <>
      <Card onPress={() => myfunc()} style={styles.surface}>
        <Card.Content style={{alignItems: 'center'}}>
          <Avatar.Text
            size={60}
            label={myprops.operator}
            color={Colors.red200}
          />
          <Paragraph>{myprops.name}</Paragraph>
        </Card.Content>
        {myprops.num_problems - myprops.num_problems_done > 0 ? (
          <Badge
            status="error"
            value={myprops.num_problems - myprops.num_problems_done}
            containerStyle={{position: 'absolute', top: 0, right: -10}}
          />
        ) : (
          <Badge
            status="success"
            containerStyle={{position: 'absolute', top: 0, right: -10}}
            value={'O'}
            // value={() => <CheckIcon width={5} height={5} />}
          />
        )}
        {/* {myprops.num_problems - myprops.num_problems_done > 0 ? ( */}
        <Badge
          status="success"
          value={'Level: ' + myprops.level}
          containerStyle={{position: 'absolute', top: 0, left: -10}}
        />
        {/* ) : null} */}
      </Card>
    </>
  );
};

export default MySurface;

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 120,
    margin: 10,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    // backgroundColor:'#d4ed82',
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
