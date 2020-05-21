import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes'
import { logout, checkAuthSaga, authUserSaga , authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrderSaga } from './order'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logout),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga )
    ])

}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    yield all([
        takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga)
    ])
    
}