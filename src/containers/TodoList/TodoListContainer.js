import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as todoActions from '../../../src/store/modules/todo'

import TodoList from '../../../src/components/TodoList/TodoList';

class TodoListContainer extends React.Component {
    handleChange = e => {
        const {TodoActions} = this.props
        TodoActions.changeInput(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault();
        const { TodoActions, input } = this.props
        TodoActions.create(input)
        TodoActions.changeInput("")
    }

    handleRemove = id => {
        const {todoActions} = this.props
        todoActions.remove(id)
    }

    render () {
        const {todoList, TodoActions, input} = this.props
        return (
            <div>
                {JSON.stringify(this.props)}
                <TodoList todoList={todoList}
                          input={input}
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit}
                          onRemove={this.handleRemove}/>
                {/*<TodoList/>*/}
            </div>
        )
    }
}

const mapStateToProps = ({ todo }) => ({
    input: todo.input,
    todoList: todo.todoList
});

const mapDispatchToProps = dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch),
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);

// export default TodoListContainer;
