import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import App from '../containers'
import Home from '../containers/Home'
import NotFound from '../containers/404'

/*
 import City from '../containers/City'
 import Login from '../containers/Login'
 import User from '../containers/User'
 import Search from '../containers/Search'
 import Detail from '../containers/Detail'
 import Home from '../containers/404'
 */

class RouteMap extends React.PureComponent {
    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/*" component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}
export default RouteMap
