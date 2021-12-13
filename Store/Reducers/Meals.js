import { MEALS } from '../../data/dummy-data';
const initial_state = {
  Meals: MEALS,
  FilterMeal: MEALS,
  FavouritesMeal: [],
};
// console.log(MEALS, 'MEAL');
const MealReducers = (state = initial_state, action) => {
  switch (action.type) {
    case 'FAV':
      const find = state.FavouritesMeal.findIndex(i => i === action.payload);
      let Fav = state.FavouritesMeal;
      if (find === -1) Fav = Fav.concat(action.payload);
      else Fav = Fav.filter(i => i !== action.payload);
      return {
        ...state,
        FavouritesMeal: Fav,
      };
    case 'FILTER':
      let filterItem = [];
      filterItem = MEALS.filter(item => {
        if (action.payload.isGluten && !item.isGlutenFree) return false;
        if (action.payload.Vegan && !item.isVegan) return false;
        if (action.payload.isLactose && !item.isLactoseFree) return false;
        if (action.payload.Vegetarian && !item.isVegetarian) return false;
        return true;
      });
      // if (filterItem.length !== 0)
      return {
        ...state,
        FilterMeal: filterItem,
      };
    // else {
    //   return {
    //     ...state,
    //     FilterMeal: MEALS,
    //   };
    // }
    default:
      return {
        ...state,
      };
  }
};
export default MealReducers;
