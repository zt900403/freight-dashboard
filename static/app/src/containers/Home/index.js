import React from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userinfoActions from '../../actions/userinfo'
import MyHeader from './subpage/Header'
import UserManager from './subpage/Contents/UserManager'
import UserGroupManager from './subpage/Contents/UserGroupManager'
import FreightFormManager from './subpage/Contents/FreightFormManager'
import './style.css'


const {Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;


class Home extends React.PureComponent {
    state = {
        collapsed: false,
        breadcrumb: [],
        content: ''
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    logoutHandle = () => {
        this.props.userInfoActions.update({})
    }


    menuClickHandle = ({item, key}) => {
        const componentMap = [
            {
                breadcrumb: ['用户管理', '用户'],
                content: <UserManager/>
            },
            {
                breadcrumb: ['用户管理', '用户组'],
                content: <UserGroupManager/>
            },
            {
                breadcrumb: ['货运单管理', '新建货运单'],
                content: <FreightFormManager/>
            }
        ]

        key = parseInt(key)

        this.setState({
            breadcrumb: componentMap[key - 1].breadcrumb,
            content: componentMap[key - 1].content
        })
        /*
        switch (key) {

            case 1:
                this.setState({
                    breadcrumb: componentMap[key - 1].breadcrumb,
                    content: componentMap[key - 1].content
                })
            case 2:
                this.setState({
                    breadcrumb: componentMap[key - 1].breadcrumb,
                    content: componentMap[key - 1].content
                })
            case 3:
                this.setState({
                    breadcrumb: componentMap[key - 1].breadcrumb,
                    content: componentMap[key - 1].content
                })


        }
         */
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={[]} mode="inline" onClick={this.menuClickHandle}>
                        <SubMenu
                            key="freightFormManager"
                            title={<span><Icon type="profile"/>货运单管理</span>}
                        >
                            <Menu.Item key="3">新建货运单</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="userManager"
                            title={<span><Icon type="user"/><span>用户管理</span></span>}
                        >
                            <Menu.Item key="1">用户</Menu.Item>
                            <Menu.Item key="2">用户组</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <MyHeader userinfo={this.props.userinfo} logout={this.logoutHandle}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {this.state.breadcrumb.map((item, index) => {
                                console.log(item)
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })}
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.state.content}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        在线货运信息编辑系统 ©2018 Created by BBT(QQ2484324007)
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
