import * as actionTypes from './actions'

const inititalState = {
    persons: []
}

const reducer = (state = inititalState, action) => {
    if(action.type === actionTypes.STORE_PERSON){
        const newPerson = {
            id: Math.random(),
            name: action.personData.name,
            age: action.personData.age
        }
        return {
            ...state,
            persons: state.persons.concat(newPerson)
        }
    }

    if(action.type === actionTypes.DELETE_PERSON){
        const updatedArray = state.persons.filter(el => el.id !== action.id )
        return {
            ...state,
            persons: updatedArray
        }
    }
    return state;
}

export default reducer;