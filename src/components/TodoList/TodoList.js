import React from 'react';
import './TodoList.css';

const TodoItem = ({item, onRemove}) => {
    return (
        <div>
        <div>{item.id + 1}. {item.content}</div>
        <button onClick={onRemove}>삭제</button>
        </div>
    )
}

const TodoList = ({todoList, TodoActions, onChange, onSubmit, onRemove, input}) => {
        const todoItems = todoList.map(item => <TodoItem item={item}
                                                         key={item.id}
                                                         onRemove={() => onRemove(item.id)}/>)
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text"
                           value={input}
                           onChange={onChange}/>
                    <button>등록</button>
                </form>
                {todoItems}
            </div>
        )
}

export default TodoList;
