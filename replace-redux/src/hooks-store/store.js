import { useState, useEffect } from 'react';

// variaveis gloabais para todo component poder utilizar os mesmos valores
// e não ser unica para cada chamada do hook
let globalState = {};
//array com funções
let listeners = [];
//actions globais 
let actions = {};

//shouldListen para aprimorar o store, decidindo se o component deve atualizar após toda mudança de state ou não
export const useStore = ( shouldListen = true) => {
    //qualquer alteração no state vai levar o component ao re-render graças ao efeito useState
    // we want just the second argument from the use useState, not the values, just the function 
    const setState = useState(globalState)[1];

    const dispatch = (actionID, payload) => {

        const newState = actions[actionID](globalState, payload)

        globalState = {...globalState, ...newState};

        for( const listener of listeners) {
            // listener will be the setState function
            listener(globalState);
        }
    };

    //todo component recebera seu proprio setState, pois listeners é uma variavel global
    useEffect(() => {
        if(shouldListen) {
            listeners.push(setState);
        }
        //clean up function when the component unmounts
        return () => {
            if(shouldListen){
                listeners = listeners.filter(li => li !== setState);
            }
        }
    }, [setState, shouldListen]);

    return [
        globalState,
        dispatch
    ];

};
//to be able to create slices of the store
export const initStore = (userActions, initialState) => {
    if(initialState) {
        globalState = { ...globalState, ...initialState};
    }

    actions = { ...actions, ...userActions};
}