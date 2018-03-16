import React from 'react'
import {Tabs, message} from 'antd';
import RegistrationForm from './RegistrationForm/index'
import UserEditTable from './UserEditTable'
import {newUser} from '../../../../../fetch/User'
import {getAllUser} from '../../../../../fetch/User'
const TabPane = Tabs.TabPane;

class UserManager extends React.PureComponent {
    state = {
        newUserLoading: false,
        userEditLoading: false,
        userEditData: [],
    }
    clickHandle = (key) => {
        if (key === '2') {
            this.setState({
                userEditLoading: true,
            })
            getAllUser()
                .then((data) => {
                    this.setState({
                        userEditData: data,
                    })
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    userEditLoading: false,
                })
            })
        }
    }
    registerNewUserHandle = (data, form) => {
        delete data.confirm
        this.setState({
            newUserLoading: true,
        })
        newUser(data)
            .then((result) => {
                message.info(result.message)
                form.resetFields()
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.setState({
                newUserLoading: false,
            })
        })
    }

    deleteUserDataFromTableHandle = (userid) => {
        this.setState({
            userEditData: this.state.userEditData.filter((item) => item.id !== userid)
        })
    }

    updateEditUserDataHandle = (data) => {
        this.setState({
            userEditData: this.state.userEditData.map((item) => {
                if (item.id === data.id) {
                    return data
                } else {
                    return item
                }
            })
        })
    }


    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.clickHandle}>
                <TabPane tab="新建用户" key="1"><RegistrationForm
                    loading={this.state.newUserLoading} onRegister={this.registerNewUserHandle}/></TabPane>
                <TabPane tab="用户编辑" key="2"><UserEditTable loading={this.state.userEditLoading}
                                                           data={this.state.userEditData}
                                                            deleteUserDataFromTable={this.deleteUserDataFromTableHandle}
                                                            updateEditUserData={this.updateEditUserDataHandle}/></TabPane>

            </Tabs>
        )
    }
}

export default UserManager