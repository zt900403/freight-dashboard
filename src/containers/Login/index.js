/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import './style.css'

import LoginForm from './subpage/LoginForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userinfoActions from '../../actions/userinfo'

class Login extends React.PureComponent {
    loginHandle = (data) => {
        // console.log(this.props.history);
        this.props.history.push('/')
        this.props.userInfoActions.update({
            ...data,
            isLogin: true
        })
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="loginDIV">
                <div className="login">
                    <LoginForm onLogin={this.loginHandle}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}
function mapDispatchToProps(dispatch){
    return {
        userInfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
