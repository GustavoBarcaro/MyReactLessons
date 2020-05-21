import axios from 'axios';
import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index'


export function* logout(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userID");
    yield put(actions.logoutSucceed());
}

export function* checkAuthSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0Ajvj-t1n82nymove13aser6jwvfPlXQ";

    if(!action.isSignup){
        url =  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0Ajvj-t1n82nymove13aser6jwvfPlXQ"         
    }
    try{

        const response = yield axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                yield localStorage.setItem('token', response.data.idToken);
                yield localStorage.setItem('expirationDate', expirationDate);
                yield localStorage.setItem('userID', response.data.localId);
                yield put(actions.authSuccess(response.data.idToken, response.data.localId));
                yield put(actions.checkAuthTimeout(response.data.expiresIn));

    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }      
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(actions.logout());
    } else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            yield put(actions.logout());
        }else{
            const userID = yield localStorage.getItem('userID');

            yield put(actions.authSuccess(token, userID));

            yield put(actions.checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000  ));
        }
        
    }
}