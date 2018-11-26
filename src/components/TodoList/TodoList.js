import React from 'react';
import './TodoList.css';

const TodoItem = ({item, onRemove, onToggle}) => {
    return (
        <div>
        <div>{item.id + 1}. {item.content}</div>
        <button onClick={onRemove}>삭제</button>
        <button onClick={onToggle}>합격</button>
        </div>
    )
}

const TodoList = ({todoList, TodoActions, onChange, onSubmit, onRemove, onToggle, input}) => {
        const todoItems = todoList.map(item => <TodoItem item={item}
                                                         key={item.id}
                                                         onRemove={() => onRemove(item.id)}
                                                         onToggle={() => onToggle(item.id)}/>)
        return (
            <div>
                {todoItems}
            </div>
        )
}

export default TodoList;
