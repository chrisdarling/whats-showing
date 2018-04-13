import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './rootSaga';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(reducers, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
