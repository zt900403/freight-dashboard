import React from 'react'
import {Tabs} from 'antd';
import NewGroupForm from './NewGroupForm'
const TabPane = Tabs.TabPane;

class UserManager extends React.PureComponent {
    clickHandle = (key) => {
        console.log(key)
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="新建用户组" key="1"><NewGroupForm/></TabPane>
                <TabPane tab="用户组编辑" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        )
    }
}

export default UserManager