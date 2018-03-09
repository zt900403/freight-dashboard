import React from 'react'
import {Tabs, message} from 'antd';
import {newUser} from '../../../../../fetch/User'
const TabPane = Tabs.TabPane;

class UserGroupManager extends React.PureComponent {
    clickHandle = (key) => {

    }
    registerNewUserHandle = (data) => {
        delete data.confirm
        newUser(data)
            .then((result) => {
                message.info(result.message)
            }).catch((err) => {
                message.error(err.message)
        })
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="用户编辑" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        )
    }
}

export default UserGroupManager