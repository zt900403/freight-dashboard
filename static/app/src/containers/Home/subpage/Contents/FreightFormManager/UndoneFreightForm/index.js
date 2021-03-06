import React from 'react'
import {Table, Button, message, Modal} from 'antd';
import EditModal from '../../../../../../controllers/EditModal'
import FreightFormStep1 from '../../../../../../controllers/FreightFormStep1'
import FreightFormStep2 from '../../../../../../controllers/FreightFormStep2'
import FreightFormStep3 from '../../../../../../controllers/FreightFormStep3'
import FreightFormStep4 from '../../../../../../controllers/FreightFormStep4'
import {updateOneRecord, deleteOneReocrd} from '../../../../../../fetch/FreightRecord'
class UndoneFreightForm extends React.PureComponent {

    state = {
        id: -1,
        modalVisible: false,
        editModalChildren: <div />,
        loading: false,
        deleteConfirmModalVisible: false,
        deleteID: -1,
        deleteLoading: false,
    }

    showModal = (id) => {
        let step = '';
        let target = {};
        this.props.data.forEach((item, index) => {
            if (item.id === id) {
                step = item.status
                target = item
            }
        })
        // if (target.date) {
        //     target.date = new Date(target.date)
        // }
        let authority = []
        if (this.props.userinfo && this.props.userinfo.authority) {
            authority = this.props.userinfo.authority
            if (step === 'STEP1' && authority.includes('STEP1')) {
                this.setState({
                    id,
                    editModalVisible: true,
                    editModalChildren: <FreightFormStep1 initialValues={target} ref={this.saveFormRef}/>
                })
            }
            if (step === 'STEP2' && authority.includes('STEP2')) {
                this.setState({
                    id,
                    editModalVisible: true,
                    editModalChildren: <FreightFormStep2 initialValues={target} ref={this.saveFormRef}/>
                })
            }

            if (step === 'STEP3' && authority.includes('STEP3')) {
                this.setState({
                    id,
                    editModalVisible: true,
                    editModalChildren: <FreightFormStep3 initialValues={target} ref={this.saveFormRef}/>
                })
            }
            if (step === 'STEP4' && authority.includes('STEP4')) {
                this.setState({
                    id,
                    editModalVisible: true,
                    editModalChildren: <FreightFormStep4 initialValues={target} ref={this.saveFormRef}/>
                })
            }

        }
    }

    handleCancel = () => {
        this.setState({editModalVisible: false});
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({editModalVisible: false});

            let target;
            let i;
            this.props.data.forEach((item, index) => {
                if (item.id === this.state.id) {
                    target = item;
                    i = index
                }
            })
            let n = target.status.slice(-1)
            if (n === '4') {
                values.status = 'DONE'
            } else if (n === '3' && !target.needPoisonInfo) {
                values.status = "DONE"
            } else {
                values.status = 'STEP' + (parseInt(n, 10) + 1)
            }
            this.props.data[i] = Object.assign({}, this.props.data[i], values)
            this.setState({
                loading: true,
            })
            updateOneRecord(this.state.id, values)
                .then((result) => {
                    message.info(result.message)
                    this.props.updateUndoneFormData(this.props.data)
                    this.setState({
                        loading: false,
                    })
                }).catch((err) => {
                message.error(err.message)
                this.setState({
                    loading: false,
                })
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    showDeleteModal = (record) => {
        this.setState({
            deleteConfirmModalVisible: true,
            deleteID: record.id
        })
    }

    deleteConfirmCancelHandle = () => {
        this.setState({
            deleteConfirmModalVisible: false,
            deleteLoading: false,
        })
    }

    deleteFreightFormHandle = () => {

        this.setState({
            deleteLoading: true,
        })
        deleteOneReocrd(this.state.deleteID)
            .then((result) => {
                message.info(result.message)
                this.props.deleteUndoneFreightData(this.state.deleteID)
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.deleteConfirmCancelHandle()
        })
    }

    render() {

        const statusMapping = {
            STEP1: '流程一',
            STEP2: '流程二',
            STEP3: '流程三',
            STEP4: '流程四',
        }
        const columns = [{
            title: '单号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '车辆名称',
            dataIndex: 'carNumber',
            key: 'carNumber',
        }, {
            title: '日期',
            key: 'date',
            render: (text, record) => {
                if (typeof(record.date) === 'string') {
                    return record.date.substring(0, 10)
                } else {
                    return record.date.toLocaleString().substring(0, 10)
                }
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                return statusMapping[record.status]
            }
        }, {
            title: '动作',
            key: 'action',
            render: (text, record) => {
                if (this.props.userinfo &&
                    this.props.userinfo.authority) {
                    let authority = this.props.userinfo.authority
                    let status = record.status
                    if (
                        (status === 'STEP1' && authority.includes('STEP1')) ||
                        (status === 'STEP2' && authority.includes('STEP2')) ||
                        (status === 'STEP3' && authority.includes('STEP3')) ||
                        // (status === 'STEP4' && authority.includes('STEP4')) ||
                        (status === 'STEP2' && authority.includes('STEP1')) ) {

                        return (
                            <div>
                                <Button type="primary" onClick={this.showModal.bind(this, record.id)}>修改</Button >
                                &nbsp;
                                {   (status === 'STEP2') && (authority.includes('STEP1'))?
                                    <Button type="dashed" onClick={this.showDeleteModal.bind(this, record)}>删除</Button >
                                    : ''
                                }
                            </div>
                        )
                    }

                }
            }
        }];


        return (
            <div>
                <Table loading={this.props.loading} columns={columns}
                       dataSource={this.props.data}
                       rowKey={record => record.id}
                />
                <EditModal
                    visible={this.state.editModalVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    confirmLoading={this.state.loading}
                >
                    {this.state.editModalChildren}
                </EditModal>
                <Modal title="" visible={this.state.deleteConfirmModalVisible}
                       onOk={this.deleteFreightFormHandle} onCancel={this.deleteConfirmCancelHandle}
                       okText="确认" cancelText="取消"
                       confirmLoading={this.state.deleteLoading}
                >
                    <p>确认删除单号为[{this.state.deleteID}]的货运单吗?</p>
                </Modal>
            </div>
        )
    }
}


export default UndoneFreightForm

