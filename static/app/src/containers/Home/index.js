import React from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userinfoActions from '../../actions/userinfo'
import MyHeader from './subpage/Header'
import UserManager from './subpage/Contents/UserManager'
import FreightFormStep1 from '../../controllers/FreightFormStep1'
import FreightFromManager from './subpage/Contents/FreightFormManager'
import CarCost from './subpage/Contents/FreightForms/CarCost'
import BuyPoisonDetail from './subpage/Contents/FreightForms/BuyPoisonDetail'
import SellPoisonDetail from './subpage/Contents/FreightForms/SellPoisonDetail'
import BuyBill from './subpage/Contents/FreightForms/BuyBill'
import SellBill from './subpage/Contents/FreightForms/SellBill'
import Put2Storage from './subpage/Contents/FreightForms/Put2Storage'
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
            /*
             {
             breadcrumb: ['用户管理', '用户组'],
             content: <UserGroupManager/>
             },
             */
            {
                breadcrumb: ['货运单管理', '新建货运单'],
                content: <FreightFormStep1 showSubmitButton={true}/>
            },
            {
                breadcrumb: ['货运单管理', '货运单概览'],
                content: <FreightFromManager userinfo={this.props.userinfo}/>
            },
            {
                breadcrumb: ['货运报表', '单车费用'],
                content: <CarCost/>
            },
            {
                breadcrumb: ['货运报表', '易制毒购入明细'],
                content: <BuyPoisonDetail/>
            },
            {
                breadcrumb: ['货运报表', '易制毒销售明细'],
                content: <SellPoisonDetail/>
            },
            {
                breadcrumb: ['货运报表', '购入应付详单'],
                content: <BuyBill/>
            },
            {
                breadcrumb: ['货运报表', '销售应收详单'],
                content: <SellBill/>
            },
            {
                breadcrumb: ['货运报表', '入库总表'],
                content: <Put2Storage/>
            },
        ]

        key = parseInt(key, 10)

        this.setState({
            breadcrumb: componentMap[key - 1].breadcrumb,
            content: componentMap[key - 1].content
        })
    }

    render() {
        let authority = this.props.userinfo.authority
        let ADMIN = authority.includes('ADMIN')
        let STEP1 = authority.includes('STEP1')
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
                            title={<span><Icon type="profile"/><span>货运单管理</span></span>}
                        >
                            <Menu.Item key="3">货运单概览</Menu.Item>
                            {
                                this.props.userinfo.authority.includes('STEP1')
                                    ? <Menu.Item key="2">新建货运单</Menu.Item>
                                    : ''
                            }
                        </SubMenu>
                        {
                            ADMIN
                                ? <SubMenu
                                key="freightForms"
                                title={<span><Icon type="form"/><span>货运报表</span></span>}
                            >
                                {STEP1 ? <Menu.Item key="4">单车费用</Menu.Item> : ''}
                                {ADMIN ? <Menu.Item key="5">易制毒购入明细</Menu.Item> : ''}
                                {ADMIN ? <Menu.Item key="6">易制毒销售明细</Menu.Item> : ''}
                                {ADMIN ? <Menu.Item key="7">购入应付详单</Menu.Item> : ''}
                                {ADMIN ? <Menu.Item key="8">销售应收详单</Menu.Item> : ''}
                                {ADMIN ? <Menu.Item key="9">入库总表</Menu.Item> : ''}
                            </SubMenu>
                                : ''
                        }
                        {   this.props.userinfo.authority.includes('ADMIN')
                            ? <SubMenu
                                key="userManager"
                                title={<span><Icon type="user"/><span>用户管理</span></span>}
                            >
                                <Menu.Item key="1">用户</Menu.Item>
                                {/*<Menu.Item key="2">用户组</Menu.Item>*/}
                            </SubMenu>
                            : ''
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <MyHeader userinfo={this.props.userinfo} logout={this.logoutHandle}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {this.state.breadcrumb.map((item, index) => {
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
