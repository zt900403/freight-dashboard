import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import Home from '../containers/Home'
import NotFound from '../containers/404'
import Login from '../containers/Login'
import PrivateRoute from './PrivateRoute'
/*
 import City from '../containers/City'
 import LoginForm from '../containers/LoginForm'
 import FreightFormStep1 from '../containers/FreightFormStep1'
 import Search from '../containers/Search'
 import Detail from '../containers/Detail'
 import LoginForm from '../containers/404'
 */

class RouteMap extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    {/*<Route exact path="/" component={Home}/>*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/*" component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}
export default RouteMap
