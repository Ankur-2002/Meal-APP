import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from '@react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FilterScreen from '../screens/FiltersScreen';
const DefaultStackNavigator = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'Screen',
};
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: { ...DefaultStackNavigator },
  }
);

const FavStackNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: { ...DefaultStackNavigator },
  }
);
const NavigationS = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: icon => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={icon.tintColor} />
        );
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === 'android' && (
        <Text
          style={{
            fontFamily: 'open-sans',
          }}
        >
          Meals
        </Text>
      ),
    },
  },
  Favourites: {
    screen: FavStackNavigator,
    navigationOptions: {
      tabBarIcon: icon => {
        return (
          <Ionicons name="ios-star-outline" size={25} color={icon.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
};
const TabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(NavigationS, {
        TintColor: Colors.accentColor,
        shifting: true,
      })
    : createBottomTabNavigator({
        NavigationS,
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });
const FilerNavigator = createStackNavigator(
  {
    Filter: FilterScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Filters',
    },
  }
);
const DrawerNavigation = createDrawerNavigator(
  {
    Menu: {
      screen: TabNavigator,
      navigationOptions: {
        headerTitle: 'Meals',
      },
    },
    Filters: { screen: FilerNavigator },
  },
  {
    contentOptions: {
      activeTintColor: 'red',
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
      itemStyle: { marginVertical: 5 },
    },
  }
);
export default createAppContainer(DrawerNavigation);
