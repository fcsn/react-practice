import {createStore, applyMiddleware} from 'redux';
import modules from './modules';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const configure = () => {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const logger = createLogger()
    const customizedMiddleware = promiseMiddleware({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']})
    const store = createStore(modules, applyMiddleware(logger, ReduxThunk, customizedMiddleware))
    return store
}

export default configure;
