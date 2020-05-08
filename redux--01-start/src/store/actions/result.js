import * as actionTypes from './actionsTypes';


// export const teste = (res) => {
//     return {
//         type: STORE_RESULT,
//         result: res
//     }
// }
export const storeResult = (result) => {
    // return (dispatch, getState) => {
    //     setTimeout(()=>{
    //     const oldcounter = getState().counterState.counter;
    //         dispatch(/* qualquer função*/ teste(result))
    //     }, 2000)
    // }
    return{
        type: actionTypes.STORE_RESULT,
        result: result
    }
};


export const deleteResult = (id) => {
    return{
        type: actionTypes.DELETE_RESULT,
        id:id
    }
};