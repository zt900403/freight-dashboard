/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import './style.css'

import LoginForm from './subpage/LoginForm'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userinfoActions from '../../actions/userinfo'
import {login} from '../../fetch/User'
import {message} from 'antd'

class Login extends React.PureComponent {

    state = {
        loading: false,
    }
    loginHandle = (data) => {
        this.setState({
            loading: true,
        })
        login({
            username: data.username,
            password: data.password
        }).then((result) => {
            this.props.userInfoActions.update({
                ...result,
                isLogin: true
            })
            this.setState({
                loading: false,
            })
            this.props.history.push('/')
        }).catch((err) => {
            message.error(err.message)
            this.setState({
                loading: false,
            })
        })
    }



    render() {
        return (
            <div id="loginDIV">
                <div className="login">
                    <LoginForm loading={this.state.loading} onLogin={this.loginHandle}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
