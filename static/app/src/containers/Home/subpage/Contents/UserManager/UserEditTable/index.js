import React from 'react'
import {Modal, Table, Button, message} from 'antd';
import EditUserForm from '../../../../../../controllers/EditUserForm'
import {deleteUser, updateOneUser} from '../../../../../../fetch/User'
class UserEditTable extends React.PureComponent {

    state = {
        editTarget: '',
        editModalVisible: false,
        deleteModalVisible: false,
        deleteUser: {},
        loading: false,
        editLoading: false,
    }

    showModal = (record) => {
        this.setState({
            editTarget: record,
            editModalVisible: true,
        })
    }
    showDeleteModal = (user) => {
        this.setState({
            deleteUser: user,
            deleteModalVisible: true,
        })
    }
    handleCancel = () => {
        this.setState({editModalVisible: false});
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
            values.id = this.state.editTarget.id
            if (values.password === '') {
                delete values.password
            }
            updateOneUser(values)
                .then((result) => {
                    message.info(result.message)
                    let obj = Object.assign({}, this.state.editTarget, values)
                    this.props.updateEditUserData(obj)
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    editModalVisible: false,
                    editLoading: false,
                });
            })

        })
    }

    deleteModalCancel = () => {
        this.setState({
            deleteModalVisible: false,
        })
    }

    deleteUserHandle = () => {
        deleteUser(this.state.deleteUser.id)
            .then((result) => {
                message.info(result.message)
                this.props.deleteUserDataFromTable(this.state.deleteUser.id)
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.deleteModalCancel()
        })
    }

    saveFormRef = (form) => {
        this.form = form
    }

    render() {
        const authorityMapping = {
            ADMIN: '管理员',
            STEP1: '流程一',
            STEP2: '流程二',
            STEP3: '流程三',
            STEP4: '流程四',
        }
        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '权限',
            key: 'authority',
            render: (text, record) => {
                let result = '';
                record.authority.forEach((item) => {
                    result += authorityMapping[item] + ', '
                })
                return result.slice(0, -2)
            }
        }, {
            title: '电话',
            key: 'phone',
            dataIndex: 'phone',
        }, {
            title: '动作',
            key: 'action',
            render: (text, record) => {
                return (<div>
                        <Button type="primary" onClick={this.showModal.bind(this, record)}>修改</Button >
                        &nbsp;
                        <Button type="dashed" onClick={this.showDeleteModal.bind(this, record)}>删除</Button >

                    </div>
                )

            }
        }];

        return (
            <div>
                <Table loading={this.props.loading} columns={columns} dataSource={this.props.data}/>
                <Modal title={`修改用户${this.state.editTarget.username}`}
                       visible={this.state.editModalVisible}
                       onOk={this.handleEdit}
                       onCancel={this.handleCancel}
                       okText="确认"
                       cancelText="取消"
                       confirmLoading={this.state.editLoading}
                >
                    <EditUserForm ref={this.saveFormRef} initialValues={this.state.editTarget} showAuthority={true}/>
                </Modal>
                <Modal title="" visible={this.state.deleteModalVisible}
                       onOk={this.deleteUserHandle} onCancel={this.deleteModalCancel}
                       okText="确认" cancelText="取消"

                >
                    <p>确认删除用户帐号为[{this.state.deleteUser.username}]用户名为[{this.state.deleteUser.name}]的用户?</p>
                </Modal>
            </div>
        )
    }
}


export default UserEditTable

