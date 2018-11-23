import React from 'react';
import TodoListContainer from '../../src/containers/TodoList/TodoListContainer'

class App extends React.Component {
    render () {
        return (
            <div className="App">
                <TodoListContainer/>
            </div>
        )
    }
}

export default App;