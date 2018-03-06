/**
 * Created by zhang on 18/03/06.
 */

import React from 'react'
import {Layout, Row, Col, Avatar, Menu, Dropdown, Icon} from 'antd';
import './style.css'

const {Header} = Layout

const HelloWorld = ({userinfo}) => {
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{background: '#fff', padding: 0}}>
            <div>
                <Row type="flex" justify="end" >
                    <Col span="4" offset="20" className="userinfo" >
                        <Avatar icon="user"/>
                        &nbsp;&nbsp;
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                {userinfo.username}<Icon type="down"/>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>

            </div>
        </Header>
    )
}

export default HelloWorld