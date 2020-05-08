import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {

    if(action.type === actionTypes.INCREMENT){
        return updateObject(state, { counter: state.counter + 1});
    }

    if(action.type === actionTypes.DECREMENT){
        return updateObject(state, { counter: state.counter - 1});
    }

    if(action.type === actionTypes.ADD){
        return updateObject(state, { counter: state.counter + action.value});
    }

    if(action.type === actionTypes.SUBTRACT){
        return updateObject(state, {counter: state.counter - action.value});
    }
    return state;
}

export default reducer;