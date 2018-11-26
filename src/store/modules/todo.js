import {createAction, handleActions} from 'redux-actions'
import produce from 'immer'

const CHANGE_INPUT = 'todo/CHANGE_INPUT'
const CREATE = 'todo/CREATE'
const TOGGLE = 'todo/TOGGLE'
const REMOVE = 'todo/REMOVE'

let id = 3;
// createAction 으로 액션 생성함수 정의
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
    input: '',
    todoList: [
        {
            id: 0,
            content: '와이와이',
            isCompleted: false
        }, {
            id: 1,
            content: '허허',
            isCompleted: false
        }, {
            id: 2,
            content: '훔킈훔킈',
            isCompleted: false
        }
    ]
}

export default handleActions({
    [CHANGE_INPUT]: (state, action) =>
        produce(state, draft => {draft.input = action.payload})
    ,
    [CREATE]: (state, action) =>
        produce(state, draft => {
            const item = {
                // payload가 하나면 action.payload로 바로 불러오지만 payload가 두 개 이상이면 객체로 들어가서 action.payload.first 이렇게 불러와야 합니다.
                content: action.payload.text,
                id: action.payload.id,
                isCompleted: false
            }
            if (action.payload.text.length !== 0) {
                draft.todoList.push(item)
            } else {
                alert('빈칸이어요')
            }
        })
    ,
    [TOGGLE]: (state, action) =>
        produce(state, draft => {
            const item = draft.todoList.find(item => item.id === action.payload)
            item.isCompleted = !item.isCompleted
        })
    ,
    [REMOVE]: (state, action) =>
        produce(state, draft => {
            draft.todoList.splice(draft.todoList.findIndex(item => item.id === action.payload), 1)
        })
}, initialState)
