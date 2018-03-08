import React from 'react'
import {Tabs, message} from 'antd';
import RegistrationForm from './RegistrationForm/index'
import {newUser} from '../../../../../fetch/User'
const TabPane = Tabs.TabPane;

class UserManager extends React.PureComponent {
    clickHandle = (key) => {

    }
    registerNewUserHandle = (data) => {
        delete data.confirm
        newUser(data)
            .then((result) => {
                message.info(result.message)
            }).catch((err) => {
            console.log('haha', err)
                message.error(err.message)
        })
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="新建用户" key="1"><RegistrationForm onRegister={this.registerNewUserHandle}/></TabPane>
                <TabPane tab="用户编辑" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        )
    }
}

export default UserManager