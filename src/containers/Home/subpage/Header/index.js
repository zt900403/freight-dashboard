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

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }


    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <div>
                        <Button type="primary" onClick={this.showModal}>编辑用户信息</Button>
                        <UserinfoEditModal
                            ref={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登陆</a>
                </Menu.Item>
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
                                    {this.props.userinfo.username}<Icon type="down"/>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>

                </div>
            </Header>
        )
    }

}

export default MyHeader