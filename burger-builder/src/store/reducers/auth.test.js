import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                token: null,
                userID: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
        })
    })
    it('should return the initial state', () => {
        expect(reducer({
                token: null,
                userID: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
        }, { type: actionTypes.AUTH_SUCCESS, 
            idToken: 'token',
            userID: 'user-token'
        })).toEqual({
            token: 'token',
            userID: 'user-token',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})