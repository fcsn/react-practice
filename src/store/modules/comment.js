import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'
import {getCommentAPIByPostId} from '../../../src/api/comment'

const GET_COMMENT_LOADING = 'comment/GET_COMMENT_LOADING'
const GET_COMMENT_SUCCESS = 'comment/GET_COMMENT_SUCCESS'
const GET_COMMENT_FAILURE = 'comment/GET_COMMENT_FAILURE'

const getCommentLoading = () => ({type: GET_COMMENT_LOADING})
const getCommentSuccess = text => ({type: GET_COMMENT_SUCCESS, payload: text})
const getCommentFailure = () => ({type: GET_COMMENT_FAILURE})

export const getComment = postId => (
    (dispatch, getState) => {
        dispatch(() => getCommentLoading())
        return getCommentAPIByPostId(postId)
        .then(text => dispatch(getCommentSuccess(text)))
        .catch(err => dispatch(getCommentFailure()))
    }
)

const initialState = {
    comment: null
}

export default handleActions({
    [GET_COMMENT_SUCCESS]: (state, action) => ({
        comment: action.payload.data
    })
}, initialState)
