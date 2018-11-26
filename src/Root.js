import React from 'react';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';

class Root extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default Root;
