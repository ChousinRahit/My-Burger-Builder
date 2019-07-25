import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 40,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 4,
  meat: 13,
  bacon: 7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingedientName]: state.ingredients[action.ingedientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingedientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingedientName]: state.ingredients[action.ingedientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingedientName],
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 40,
        building: false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
