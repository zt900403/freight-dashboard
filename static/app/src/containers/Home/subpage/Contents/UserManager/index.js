import React from 'react'
import {Tabs} from 'antd';
import RegistrationForm from './RegistrationForm/index'
const TabPane = Tabs.TabPane;

class UserManager extends React.PureComponent {
    clickHandle = (key) => {
        console.log(key)
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="新建用户" key="1"><RegistrationForm/></TabPane>
                <TabPane tab="用户编辑" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        )
    }
}

export default UserManager