/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
    <Route {...rest} render={(props) => {
        return (
            isLogin
            ? <Component {...props} />
            : <Redirect to='/login' />
        )
    }} />
)


function mapStateToProps(state){
    return {
        isLogin: state.userinfo.isLogin
    }
}
export default connect(
    mapStateToProps
)(PrivateRoute)