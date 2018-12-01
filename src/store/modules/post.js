import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {getPostAPI, getPostAPIByUserId} from '../../../src/api/post'

const GET_POST_PENDING = 'post/GET_POST_PENDING'
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS'
const GET_POST_FAILURE = 'post/GET_POST_FAILURE'

const GET_POST_BY_ID_PENDING = 'post/GET_POST_BY_ID_PENDING'
const GET_POST_BY_ID_SUCCESS = 'post/GET_POST_BY_ID_SUCCESS'
const GET_POST_BY_ID_FAILURE = 'post/GET_POST_BY_ID_FAILURE'

const getPostPending = () => ({type: GET_POST_PENDING})
const getPostSuccess = (text) => ({type: GET_POST_SUCCESS, payload: text})
const getPostFailure = () => ({type: GET_POST_FAILURE})

const getPostByIdPending = () => ({type: GET_POST_BY_ID_PENDING})
const getPostByIdSuccess = list => ({type: GET_POST_BY_ID_SUCCESS, payload: list})
const getPostByIdFailure = () => ({type: GET_POST_BY_ID_FAILURE})

export const getPost = num => (
    (dispatch, getState) => {
        dispatch(getPostPending())
        return getPostAPI(num)
        .then(text => {
              dispatch(getPostSuccess(text))
              return text
        })
        .catch(err => {
            dispatch(getPostFailure())
        })
})

export const getPostById = userId => (
    (dispatch, getState) => {
        dispatch(getPostByIdPending())
        return getPostAPIByUserId(userId)
        .then(text => {
            console.log(text)
            dispatch(getPostByIdSuccess(text))
        })
        .catch(err => {
            dispatch(getPostByIdFailure())
        })
    }
)

const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    },
    posts: []
}

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true
        };
    },
        // produce(state, draft =>
        //     draft.pending = true
        // )
    // ,
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;
        return {
            ...state,
            pending: false,
            data: {
                title, body
            }
        };
    },
    [GET_POST_BY_ID_SUCCESS]: (state, action) => ({
        ...state,
        posts: action.payload.data
    }),
    // [GET_POST_SUCCESS]: (state, action) =>
    //     produce((state, draft) => {
    //         draft.pending = false
    //         draft.data.title = action.payload.data.title
    //         draft.data.body = action.payload.data.body
    //     })
    // ,
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);
