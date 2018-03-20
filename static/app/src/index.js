import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import RouteMap from './router/routeMap'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'


moment.locale('zh-cn');

const store = configureStore({userinfo: {isLogin: false}})

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <RouteMap/>
        </LocaleProvider>
    </Provider>
    ,
    document.getElementById('root'));

registerServiceWorker();

