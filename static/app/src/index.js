import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import RouteMap from './router/routeMap'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
const store = configureStore({userinfo: {isLogin: false}})

ReactDOM.render(
    <Provider store={store}>
        <RouteMap/>
    </Provider>
    ,
    document.getElementById('root'));

registerServiceWorker();

