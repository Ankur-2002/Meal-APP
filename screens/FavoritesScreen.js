import React, { useCallback, useEffect, useState } from 'react';
import MealList from '../components/MealList';
// import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';
const FavoritesScreen = props => {
  const meals = useSelector(state => state.meal.Meals);
  const favMeal = useSelector(state => state.meal.FavouritesMeal);
  const [Fav, setFav] = useState([]);

  let Meal = [];
  const get = useCallback(() => {
    favMeal.map(i => {
      let news = meals.filter(item => item.id === i);
      Meal = [...Meal, ...news];
    });
    setFav(Meal);
  }, [favMeal]);
  useEffect(() => {
    console.log('Ankur');
    get();
  }, [favMeal]);

  if (favMeal.length === 0)
    return (
      <View style={Styles.screen}>
        <DefaultText> No Favorite Item!!</DefaultText>
      </View>
    );
  else return <MealList navigation={props} Meal={[...Fav]} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: 'Favorites',
};

export default FavoritesScreen;
const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
