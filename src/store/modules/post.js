import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';
import produce from 'immer';

function getPostAPI () {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
}

const GET_POST = 'post/GET_POST'
const GET_POST_PENDING = 'post/GET_POST_PENDING'
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS'
const GET_POST_FAILURE = 'post/GET_POST_FAILURE'

export const getPost = id => ({
    type: GET_POST,
    payload: getPostAPI(id)
})
// export const getPost = createAction(GET_POST, data => getPostAPI())

const initialState = {
    pending: false,
    error: false,
    data: {
        title: '',
        body: ''
    }
}

export default handleActions({
    // [GET_POST_PENDING]: (state, action) => {
    //     return {
    //         ...state,
    //         pending: true,
    //         error: false
    //     };
    // },
    [GET_POST_PENDING]: (state, action) =>
        produce(state, draft =>
            draft.pending = true
        )
    ,
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;
        const nextState = produce(state, draft =>
        console.log(action.payload.data))
        return {
            ...state,
            pending: false,
            data: {
                title, body
            }
        };
    },
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
