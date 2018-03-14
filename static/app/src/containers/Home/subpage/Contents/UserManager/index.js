import React from 'react'
import {Tabs, message} from 'antd';
import RegistrationForm from './RegistrationForm/index'
import {newUser} from '../../../../../fetch/User'
const TabPane = Tabs.TabPane;

class UserManager extends React.PureComponent {
    state = {
        newUserloading: false,
    }
    clickHandle = (key) => {

    }
    registerNewUserHandle = (data) => {
        delete data.confirm
        this.setState({
            newUserloading: true,
        })
        newUser(data)
            .then((result) => {
                message.info(result.message)
                this.setState({
                    newUserloading: false,
                })
            }).catch((err) => {
            message.error(err.message)
            this.setState({
                newUserloading: false,
            })

        })
        /*.finally(() => {
         this.setState({
         newUserloading: false,
         })
         })*/
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="新建用户" key="1"><RegistrationForm
                    loading={this.state.newUserloading} onRegister={this.registerNewUserHandle}/></TabPane>
                <TabPane tab="用户编辑" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        )
    }
}

export default UserManager