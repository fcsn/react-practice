import {crateAction, handleActions} from 'redux-actions';
import produce from 'immer'
import {getPhotosByAlbumId} from '../../../src/api/photo'

const GET_PHOTO_LOADING = 'photo/GET_PHOTO_LOADING'
const GET_PHOTO_SUCCESS = 'photo/GET_PHOTO_SUCCESS'
const GET_PHOTO_FAILURE = 'photo/GET_PHOTO_FAILURE'

const getPhotoLoading = () => ({type: GET_PHOTO_LOADING})
const getPhotoSuccess = photo => ({type: GET_PHOTO_SUCCESS, payload: photo})
const getPhotoFailure = () => ({type: GET_PHOTO_FAILURE})

export const getPhoto = albumId => (
    (dispatch, getState) => {
        dispatch(getPhotoLoading())
        return getPhotosByAlbumId(albumId)
        .then(photo => dispatch(getPhotoSuccess(photo)))
        .catch(err => dispatch(getPhotoFailure()))
    }
)

const initialState = {
    photo: [],
    error: false,
    loading: false
}

export default handleActions({
    [GET_PHOTO_LOADING]: (state, action) => ({
        ...state,
        loading: true
    }),
    [GET_PHOTO_SUCCESS]: (state, action) => ({
        ...state,
        photo: action.payload.data,
        loading: false
    }),
    [GET_PHOTO_FAILURE]: (state, action) => ({
        ...state,
        loading: false,
        error: true
    })
}, initialState)
