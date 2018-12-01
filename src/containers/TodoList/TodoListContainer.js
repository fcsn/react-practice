import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as todoActions from '../../../src/store/modules/todo'
import * as postActions from '../../../src/store/modules/post'
import * as userActions from '../../../src/store/modules/user'
import * as commentActions from '../../../src/store/modules/comment'
import * as photoActions from '../../../src/store/modules/photo'
import { Card, Button, CardTitle, CardText } from 'reactstrap';

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
        PhotoActions.getPhoto(1)
        PostActions.getPost(1)
        UserActions.getUser(1)
        CommentActions.getComment(1)
        PostActions.getPostById(1)
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
            postList,
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

        const PostView = () => {
            const {post, postLoading, postError} = this.props
            if (postLoading) {
                console.log(postLoading)
                return (
                    <Card body className="text-center">
                        <CardTitle>loading...</CardTitle>
                        <CardText>Now loading</CardText>
                        <Button>...</Button>
                    </Card>
                )
            } else if (postError) {
                return (
                    <Card body className="text-center">
                        <CardTitle>No Data</CardTitle>
                        <CardText>Not found</CardText>
                    </Card>
                )
            } else {
                return (
                    <Card body className="text-center">
                        <CardTitle>{post.title}</CardTitle>
                        <CardText>{post.body}</CardText>
                        <Button>Go somewhere</Button>
                    </Card>
                )
            }
        }

        const PostListView = () => {
            const {postList} = this.props
            return postList.map(post =>
                <div key={post.id} style={{maxWidth: 800}}>
                    <Card body className="text-center" style={{marginTop: 50, display: 'flex', justifyContent: 'center'}}>
                        <CardTitle>{post.title}</CardTitle>
                        <CardText style={{fontWeight: 'lighter'}}>{post.body}</CardText>
                        <div>
                        <Button style={{maxWidth: 300}}>Go Post</Button>
                        </div>
                    </Card>
                </div>
            )
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {/*<div style={{maxWidth: 800, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>*/}
                    {/*<PostView/>*/}
                {/*</div>*/}

                <PostListView/>

                <h1>user</h1>
                {userLoading && <h1>시방 user로딩중</h1>}
                {userError ?
                    <h1>user에러라능!</h1>
                    :
                    <div>
                        {JSON.stringify(user.user[0])}
                    </div>
                }

                <h1>photo</h1>
                {photoLoading && <h1>시방 photo로딩중</h1>}
                {photoError ?
                    <h1>photo에러라능!</h1>
                    :
                    <div>
                    {JSON.stringify(photo[0])}
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
    photo: photo.photo,
    photoError: photo.error,
    photoLoading: photo.loading,
    postList: post.posts
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
