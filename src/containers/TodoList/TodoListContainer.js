import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as todoActions from '../../../src/store/modules/todo'
import * as postActions from '../../../src/store/modules/post'
import * as userActions from '../../../src/store/modules/user'
import * as commentActions from '../../../src/store/modules/comment'
import * as photoActions from '../../../src/store/modules/photo'

import TodoList from '../../../src/components/TodoList/TodoList';

class TodoListContainer extends React.Component {

    handleChange = e => {
        const {TodoActions} = this.props
        if (e.target.value !== 0)
        TodoActions.changeInput(e.target.value)
    }

    handleSubmit = e => {
        e.preventDefault();
        const {TodoActions, input} = this.props
        TodoActions.create(input)
        TodoActions.changeInput('')
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
        const {PostActions, UserActions, CommentActions, PhotoActions} = this.props
        PostActions.getPost(1)
        UserActions.getUser(1)
        CommentActions.getComment(1)
        PhotoActions.getPhoto(1)
    }

    render () {
        const {
            //todos
            todoList,
            TodoActions,
            input,
            //post
            post,
            postLoading,
            postError,
            //comment
            comment,
            //user
            user,
            userError,
            userLoading,
            //photo
            photo,
            photoError,
            photoLoading} = this.props

        return (
            <div>
                {/*{JSON.stringify(this.props.user.user)}*/}
                {/*comment: {JSON.stringify(this.props.comment)}*/}
                {postLoading && <h1>시방 post로딩중</h1>}
                {postError ?
                    <h1>에러라능!</h1>
                    : <div>
                      <h1>{post.title}</h1>
                      <div>{post.body}</div>
                      <h2>{String(user.user)}</h2>
                      </div>
                }
                {userLoading && <h1>시방 user로딩중</h1>}
                {userError ?
                    <h1>user에러라능!</h1>
                    :
                    <div>
                    {String(user.user)}
                    </div>
                }
                {photoLoading && <h1>시방 photo로딩중</h1>}
                {photoError ?
                    <h1>photo에러라능!</h1>
                    :
                    <div>
                    {String(photo)}
                    </div>
                }
                <form onSubmit={this.handleSubmit}>
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

const mapStateToProps = ({ todo, post, user, comment, photo }) => ({
    input: todo.input,
    todoList: todo.todoList,
    post: post.data,
    postLoading: post.pending,
    postError: post.error,
    user: user,
    comment: comment,
    userError: user.error,
    userLoading: user.loading,
    photo: photo,
    photoError: photo.error,
    photoLoading: photo.loading
});

const mapDispatchToProps = dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    CommentActions: bindActionCreators(commentActions, dispatch),
    PhotoActions: bindActionCreators(photoActions, dispatch),
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoListContainer);

// export default TodoListContainer;
