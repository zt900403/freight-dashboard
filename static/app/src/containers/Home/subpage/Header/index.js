/**
 * Created by zhang on 18/03/06.
 */

import React from 'react'
import {Button, Layout, Row, Col, Avatar, Menu, Dropdown, Icon} from 'antd';
import './style.css'
import UserinfoEditModal from './UserinfoEditModal'

const {Header} = Layout

class MyHeader extends React.PureComponent {
    state = {
        visible: false,
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    menuClickHandle = ({key}) => {
        switch(key) {
            case "1":
                this.showModal()
            case "2":
                this.props.logout()
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
                                <a className="ant-dropdown-link" href="#">
                                    {this.props.userinfo.name}<Icon type="down"/>
                                </a>
                            </Dropdown>
                            <UserinfoEditModal
                                ref={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                        </Col>
                    </Row>

                </div>
            </Header>
        )
    }

}

export default MyHeader