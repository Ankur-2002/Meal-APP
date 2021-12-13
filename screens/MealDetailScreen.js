import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import DefaultText from '../components/DefaultText';
import HeaderCustomButton from '../components/HeaderButton';
// import { MEALS } from '../data/dummy-data';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';

const TitleText = props => {
  return <Text style={styles.TitleText}>{props.children}</Text>;
};
const MealDetailScreen = props => {
  const Meals = useSelector(state => state.meal.FilterMeal);
  const mealId = props.navigation.getParam('id');
  const favouriteMeals = useSelector(state => state.meal.FavouritesMeal);
  const find = favouriteMeals.indexOf(mealId);
  const dispatch = useDispatch();
  const get = useCallback(() => {
    props.navigation.setParams({ find: find >= 0 });
  }, [favouriteMeals]);
  const setDispatch = useCallback(() => {
    props.navigation.setParams({ dispatch: dispatch });
  }, [dispatch]);
  const selectedMeal = Meals.find(meal => meal.id === mealId);
  useEffect(() => {
    setDispatch();
  }, [selectedMeal, mealId]);
  useEffect(() => {
    get();
  }, [mealId, favouriteMeals]);
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.Image} />
        <Text style={styles.topTitle}>{selectedMeal.title}</Text>
        <View style={styles.mealsItem}>
          <View style={styles.mealsTitles}>
            <TitleText>{selectedMeal.duration}M</TitleText>
            <TitleText>
              <Ionicons name="timer-outline" size={16} />
            </TitleText>
          </View>

          <View style={styles.mealsTitles}>
            <TitleText>{selectedMeal.complexity.toUpperCase()}</TitleText>
            <TitleText>
              <Ionicons name="cafe-outline" size={16} />
            </TitleText>
          </View>

          <View style={styles.mealsTitles}>
            <TitleText>{selectedMeal.affordability.toUpperCase()}</TitleText>
            <TitleText>
              <Ionicons name="arrow-forward-outline" size={16} />
            </TitleText>
          </View>
        </View>
        <View style={styles.bottompart}>
          <Text style={styles.ListTitle}>Ingredients</Text>
          <View style={styles.ingredients}>
            {selectedMeal.ingredients.map(i => (
              <Text key={i} style={styles.listItem}>
                {i}
              </Text>
            ))}
          </View>
          <Text style={styles.ListTitle}>Steps</Text>
          <View style={styles.ingredients}>
            {selectedMeal.steps.map((i, index) => (
              <Text key={index} style={styles.listItem}>
                {i}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const RightHeader = ({ mealId, find, dispatch }) => {
  console.log(find, 'Ankur find');
  return (
    <HeaderButtons HeaderButtonComponent={HeaderCustomButton}>
      <Item
        title="icon"
        iconName={find ? 'ios-star' : 'ios-star-outline'}
        iconSize={26}
        onPress={() =>
          dispatch({
            type: 'FAV',
            payload: mealId,
          })
        }
      ></Item>
    </HeaderButtons>
  );
};
MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('id');
  const title = navigationData.navigation.getParam('Title');
  const find = navigationData.navigation.getParam('find');
  const dispatch = navigationData.navigation.getParam('dispatch');
  return {
    headerTitle: title,
    headerRight: () => (
      <RightHeader mealId={mealId} find={find} dispatch={dispatch} />
    ),
  };
};

const styles = StyleSheet.create({
  topTitle: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    padding: 10,

    fontSize: 20,
    backgroundColor: Colors.accentColor,
  },
  ListTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    paddingBottom: 7,
    letterSpacing: 1,
  },
  screen: {},
  mealsItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2);',
    padding: 10,
  },
  bottompart: {
    flex: 1,
    alignItems: 'center',
  },
  listItem: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 5,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'open-sans-bold',
    fontSize: 17,
    color: 'rgba(0,0,0,0.8);',
  },
  Image: {
    width: '100%',
    height: 200,
  },
  ingredients: {
    width: '100%',
    padding: 5,
  },
  mealsTitles: {
    // borderWidth: 1,
    // justifyContent: 'center',
  },
  TitleText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },
});

export default MealDetailScreen;
