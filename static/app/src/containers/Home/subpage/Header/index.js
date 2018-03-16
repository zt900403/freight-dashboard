/**
 * Created by zhang on 18/03/06.
 */

import React from 'react'
import {Modal, message, Layout, Row, Col, Avatar, Menu, Dropdown, Icon} from 'antd';
import './style.css'

import {updateOneUser} from '../../../../fetch/User'
import EditUserForm from '../../../../controllers/EditUserForm'
const {Header} = Layout

class MyHeader extends React.PureComponent {
    state = {
        visible: false,
        editLoading: false,
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleEdit = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({
                editLoading: true,
            })
            if (values.password === '') {
                delete values.password
            }
            values.id = this.props.userinfo.id
            updateOneUser(values)
                .then((result) => {
                    message.info(result.message)
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    visible: false,
                    editLoading: false,
                });
                this.props.logout()
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    menuClickHandle = ({key}) => {
        switch (key) {
            case "1":
                this.showModal()
                break;
            case "2":
                this.props.logout()
                break;
            default:
                break;
        }
    }

    render() {
        let menu = (
            <Menu onClick={this.menuClickHandle}>
                <Menu.Item key="1">修改个人资料</Menu.Item>
                <Menu.Item key="2">退出登陆</Menu.Item>
            </Menu>
        );

        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div>
                    <Row type="flex" justify="end">
                        <Col span="4" offset="20" className="userinfo">
                            <Avatar icon="user"/>
                            &nbsp;&nbsp;
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    {this.props.userinfo.name}<Icon type="down"/>
                                </a>
                            </Dropdown>
                            <Modal title={`修改用户${this.props.userinfo.name}`}
                                   visible={this.state.visible}
                                   onOk={this.handleEdit}
                                   onCancel={this.handleCancel}
                                   okText="确认"
                                   cancelText="取消"
                                   confirmLoading={this.state.editLoading}>

                                <EditUserForm ref={this.saveFormRef} initialValues={this.props.userinfo}/>
                            </Modal>
                        </Col>
                    </Row>

                </div>
            </Header>
        )
    }

}

export default MyHeader