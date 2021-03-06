import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'
import {getUserAPIByUserId} from '../../../src/api/user'

const GET_USER_LOADING = 'user/GET_USER_LOADING';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'user/GET_USER_FAILURE';

const getUserLoading = () => ({type: GET_USER_LOADING})
const getUserSuccess = (user) => ({type: GET_USER_SUCCESS, payload: user})
const getUserFailure = () => ({type: GET_USER_FAILURE})

export const getUser = userId => (
    (dispatch, getState) => {
        dispatch(getUserLoading())
        return getUserAPIByUserId(userId)
        .then(user => {
            dispatch(getUserSuccess(user))
            return user
        })
        .catch(err => {
            console.log(err)
            dispatch(getUserFailure())
        })
})

const initialState = {
        user: [],
        error: false,
        loading: false
}

export default handleActions({
    [GET_USER_LOADING]: (state, action) => ({
        ...state,
        loading: true
    }),
    [GET_USER_SUCCESS]: (state, action) => ({
        // produce((state, draft) => {
        //     draft.user = action.payload.data
        // })
        ...state,
        user: action.payload.data,
        loading: false
    }),
    [GET_USER_FAILURE]: (state, action) => ({
        ...state,
        error: true,
        loading: false
    })
}, initialState)
