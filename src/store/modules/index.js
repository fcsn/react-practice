import {combineReducers} from 'redux';
import todo from './todo'
import post from './post'

export default combineReducers({
    todo,
    post
})
