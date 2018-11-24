import React from 'react';
import './TodoList.css';

const TodoItem = ({item}) => {
    return (
        <div>{item.id}. {item.content}</div>
    )
}

const TodoList = ({todoList, TodoActions, onChange, onSubmit, input}) => {
        const todoItems = todoList.map(item => <TodoItem item={item} key={item.id}/>)
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
