import React from 'react';

import MealList from '../components/MealList';
// import { Color } from '../Constants/Colors';
import { CATEGORIES } from '../data/dummy-data';
var titles = '';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';
const CategoryMealScreen = props => {
  const Meals = useSelector(state => state.meal.FilterMeal);
  const CatId = props.navigation.getParam('categoryId');
  const Meal = Meals.filter(item => item.categoryIds.indexOf(CatId) >= 0);

  if (Meal.length === 0)
    return (
      <View style={Styles.screen}>
        <DefaultText>NO ITEMS FOUND</DefaultText>
      </View>
    );
  else return <MealList Meal={Meal} navigation={props} CatId={CatId} />;
};
CategoryMealScreen.navigationOptions = props => {
  const CatId = props.navigation.getParam('categoryId');
  titles = CATEGORIES.find(i => i.id === CatId).title;
  return {
    headerTitle: titles,
  };
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CategoryMealScreen;
