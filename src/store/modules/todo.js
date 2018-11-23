import {createAction, handleActions} from 'redux-actions'
import produce from 'immer'

let id = 3;

const CHANGE_INPUT = createAction('todo/CHANGE_INPUT', text => text);
const CREATE = createAction('todo/CREATE', text => ({text, id: id++}));
const TOGGLE = createAction('todo/TOGGLE', id => id);
const REMOVE = createAction('todo/REMOVE', id => id);

const initialState = {
    input: '',
    todoList: [
        {
            id: 0,
            content: '',
            isCompleted: false
        }, {
            id: 0,
            content: '',
            isCompleted: false
        }, {
            id: 0,
            content: '',
            isCompleted: false
        }
    ]
}

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        produce(state, draft => draft.input = action.payload)
    },
    [CREATE]: (state, action) => {
        produce(state, draft => {
            const item = {
                // payload가 하나면 action.payload로 바로 불러오지만 payload가 두 개 이상이면 객체로 들어가서 action.payload.first 이렇게 불러와야 합니다.
                content: action.payload.text,
                id: action.payload.id,
                isCompleted: false
            }
            draft.todoList.push(item)
        })
    },
    [TOGGLE]: (state, action) => {
        produce(state, draft => {
            const item = draft.todoList.find(item => item.id === action.payload)
            item.isCompleted = !item.isCompleted
        })
    },
    [REMOVE]: (state, action) => {
        produce(state, draft => {
            draft.todoList.splice(draft.todoList.findIndex(item => item.id === action.payload), 1)
        })
    }
}, initialState)