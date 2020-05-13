import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const INGREDIENT_PRICES = {
    salad: 1.5,
    cheese: 2,
    meat: 4,
    bacon: 2.5
}

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 5
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {

    const updatedRemovedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
    const updatedRemovedIngredients = updateObject(state.ingredients, updatedRemovedIngredient);
    const updatedRemovedState = {
        ingredients: updatedRemovedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedRemovedState);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        totalPrice: 5,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error:false
    });

}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
}


const BurgerBuilderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default BurgerBuilderReducer;