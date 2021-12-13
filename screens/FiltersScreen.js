import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ToastAndroid } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
const FilterSwitch = props => {
  return (
    <View style={styles.filterScreen}>
      <Text style={styles.filterTitle}>{props.title}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor, false: 'grey' }}
        thumbColor={Colors.primaryColor}
        value={props.isGluten}
        onValueChange={newValue => {
          // console.log(newValue);
          ToastAndroid.showWithGravityAndOffset(
            `${props.title + (newValue ? ' Enabled' : ' Disabled')}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            23,
            23
          );
          props.setIsGluten(newValue);
        }}
      />
    </View>
  );
};
const FiltersScreen = props => {
  // const state = useSelector(state => state.meal.FilterMeal);
  const Dispatch = useDispatch();
  const [isGluten, setIsGluten] = useState(false);
  const [isLactose, setLactose] = useState(false);
  const [Vegertarian, setVegetarian] = useState(false);
  const [Vegan, setVegan] = useState(false);

  const SaveDetails = useCallback(() => {
    const state = {
      isGluten: isGluten,
      isLactose: isLactose,
      Vegan: Vegan,
      Vegertarian: Vegertarian,
    };
    Dispatch({ type: 'FILTER', payload: state });
    // console.log(state);
  }, [isGluten, isLactose, Vegan, Vegertarian]);
  useEffect(() => {
    props.navigation.setParams({
      save: SaveDetails,
    });
  }, [SaveDetails]);
  return (
    <View style={styles.screen}>
      <Text style={styles.Title}>Available Filter / Restrictions</Text>
      <FilterSwitch
        title="Gluten-Free"
        isGluten={isGluten}
        setIsGluten={setIsGluten}
      />
      <FilterSwitch
        title="Lactose-Free"
        isGluten={isLactose}
        setIsGluten={setLactose}
      />
      <FilterSwitch title="Vegan" isGluten={Vegan} setIsGluten={setVegan} />
      <FilterSwitch
        title="Vegetarian"
        isGluten={Vegertarian}
        setIsGluten={setVegetarian}
      />
    </View>
  );
};
FiltersScreen.navigationOptions = props => {
  return {
    headerTitle: 'Filter',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="ios-menu"
            iconSize={35}
            onPress={props.navigation.toggleDrawer}
            title="Menu"
          ></Item>
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="ios-save"
            iconSize={25}
            onPress={() => {
              props.navigation.getParam('save')();
            }}
            title="Save"
          ></Item>
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  saveRight: {},
  screen: {
    width: '100%',
    alignItems: 'center',
  },
  Title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  filterScreen: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTitle: {
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default FiltersScreen;
