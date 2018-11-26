import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as todoActions from '../../../src/store/modules/todo'
import * as postActions from '../../../src/store/modules/post'

import TodoList from '../../../src/components/TodoList/TodoList';

class TodoListContainer extends React.Component {
    state = {
        data: null
    }

    handleChange = e => {
        const {TodoActions} = this.props
        if (e.target.value !== 0)
        TodoActions.changeInput(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault();
        const {TodoActions, input} = this.props
        TodoActions.create(input)
        TodoActions.changeInput("")
    }

    handleRemove = id => {
        const {TodoActions} = this.props
        TodoActions.remove(id)
    }

    handleToggle = id => {
        const {TodoActions} = this.props
        TodoActions.toggle(id)
    }

    componentDidMount () {
        const {PostActions} = this.props
        const post = PostActions.getPost(1)
        this.setState({data: post})
    }

    render () {
        const {todoList, TodoActions, input, post, loading, error} = this.props
        return (
            <div>
                {/*{JSON.stringify(this.props)}*/}
                {loading && <h1>시방 loading중</h1>}
                {error ?
                    <h1>에러라능!</h1>
                    : <div>
                      <h1>{post.title}</h1>
                      <div>{post.body}</div>
                      </div>
                }
                <form onSubmit={this.handleSubmit}>
                    dsd
                    <input type="text"
                           value={input}
                           onChange={this.handleChange}/>
                    <button>등록</button>
                </form>
                <TodoList todoList={todoList}
                          input={input}
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit}
                          onRemove={this.handleRemove}
                          onToggle={this.handleToggle}/>
                {/*<TodoList/>*/}
            </div>
        )
    }
}

const mapStateToProps = ({ todo, post }) => ({
    input: todo.input,
    todoList: todo.todoList,
    post: post.data,
    loading: post.pending,
    error: post.error
});

const mapDispatchToProps = dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);

// export default TodoListContainer;
