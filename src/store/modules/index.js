import {combineReducers} from 'redux';
import todo from './todo'
import post from './post'
import user from './user'
import comment from './comment'
import photo from './photo'

export default combineReducers({
    todo,
    post,
    user,
    comment,
    photo
})
