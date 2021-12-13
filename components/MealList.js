import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ListItem from './MealItem';
const RenderItem = (item, props) => {
  // console.log(props, 'ankur');
  return (
    <ListItem
      title={item.item.title}
      image={item.item.imageUrl}
      id={item.item.id}
      complexity={item.item.complexity}
      affordability={item.item.affordability}
      duration={item.item.duration}
      navigation={props.navigation}
    />
  );
};
const MealList = props => {
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={data => {
          return data.id;
        }}
        data={props.Meal}
        renderItem={data => RenderItem(data, props.navigation)}
        style={{
          width: '90%',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MealList;
