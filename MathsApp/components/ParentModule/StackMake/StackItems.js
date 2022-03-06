import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import SelectedItem from './SelectedItem';
import {operations} from '../../../Data/Data';

function StackItems({setSelected, selected, formatinfo}) {
  useEffect(() => {
    // console.log(' selected in stack items', selected);
    let newselected = selected.map(k => {
      // console.log(k);
      if (k.name) {
        return k;
      } else {
        let op = operations.filter(o => o.id == k.operation_id)[0];
        k = {...k, name: op.name, operator: op.operator};
        return k;
      }
    });
    setSelected(newselected);
  }, []);

  const deleteItem = item => {
    let temp = selected.filter(operation => item.id != operation.id);
    setSelected(selected.filter(o => o.id != item.id));
    console.log('after delete ', selected);
  };

  const renderGridList = renderGridData => {
    return (
      // <SafeAreaView style={styles.container}>
      <FlatList
        data={renderGridData}
        renderItem={({item}) => (
          <SelectedItem
            item={item}
            myFunc={deleteItem}
            formatinfo={formatinfo}
          />
        )}
        numColumns={5}
        keyExtractor={(item, index) => index}
      />
      // </SafeAreaView>
    );
  };

  return <View style={styles.container}>{renderGridList(selected)}</View>;
  return <View style={{height: '30%'}}>{renderGridList(selected)}</View>;
  return <View>{renderGridList(selected)}</View>;
}

export default StackItems;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5,
    margin: 5,
    backgroundColor: '#ecf0f1',
    borderColor: '#aabbcc',
    borderRadius: 10,
    padding: 8,
  },
});
