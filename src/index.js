import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import RouteMap from './router/routeMap'

ReactDOM.render(
    <RouteMap/>,
    document.getElementById('root'));
registerServiceWorker();
