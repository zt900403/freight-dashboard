import React from 'react'
import {message, Table, Button, Modal} from 'antd';
import FreightFormDetail from '../../../../../../controllers/FreightFormDetail'
import FreightFormRollback from '../../../../../../controllers/FreightFormRollback'
import {updateOneRecord, deleteOneReocrd} from '../../../../../../fetch/FreightRecord'
class DoneFreightForm extends React.PureComponent {
    state = {
        detailData: '',
        rollbackData: '',
        modalVisible: false,
        rollbackModalVisible: false,
        rollbackLoading: false,
        deleteConfirmModalVisible: false,
        deleteLoading: false,
        deleteID: -1,
    }

    showModal = (record) => {
        this.setState({
            detailData: record,
            editModalVisible: true,
        })
    }
    showRollbackModal = (record) => {
        this.setState({
            rollbackData: record,
            rollbackModalVisible: true,
        })
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

    rollbackOkHandle = () => {
        const form = this.form

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({
                rollbackLoading: true,
            })
            updateOneRecord(this.state.rollbackData.id, values)
                .then((result) => {
                    message.info(result.message)
                    if (values.status !== 'DONE') {
                        let obj = Object.assign({}, this.state.rollbackData, values)
                        this.props.updateDoneFreightData(obj)
                    }
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    rollbackModalVisible: false,
                    rollbackLoading: false,
                })
                this.form.resetFields()
            })
        })
    }
    rollbackCancelHandle = () => {
        this.setState({
            rollbackModalVisible: false,
        })
        this.form.resetFields()
    }
    saveFormRef = (form) => {
        this.form = form
    }

    handleCancel = () => {
        this.setState({editModalVisible: false});
    }


    deleteFreightFormHandle = () => {

        this.setState({
            deleteLoading: true,
        })
        deleteOneReocrd(this.state.deleteID)
            .then((result) => {
                message.info(result.message)
                this.props.deleteDoneFreightData(this.state.deleteID);
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.deleteConfirmCancelHandle()
        })
    }
    render() {
        const columns = [{
            title: '单号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
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
            title: '动作',
            key: 'action',
            render: (text, record) => {
                return (<div>
                        <Button type="primary" onClick={this.showModal.bind(this, record)}>明细</Button >
                        &nbsp;
                        <Button type="primary" onClick={this.showRollbackModal.bind(this, record)}>回退</Button >
                        &nbsp;
                        <Button type="dashed" onClick={this.showDeleteModal.bind(this, record)}>删除</Button >

                    </div>
                )
            }
        }];

        return (
            <div>
                <Table loading={this.props.loading} columns={columns} dataSource={this.props.data}/>
                <Modal
                    cancelText="关闭"
                    title="货运单详情"
                    visible={this.state.editModalVisible}
                    onCancel={this.handleCancel}
                    width={1000}
                    footer={[
                        <Button key="cancel" type="primary" onClick={this.handleCancel}>关闭</Button>
                    ]}
                >
                    <FreightFormDetail data={this.state.detailData}
                                       userinfo={this.props.userinfo}/>
                </Modal>
                <Modal title="流程回退" visible={this.state.rollbackModalVisible}
                       onOk={this.rollbackOkHandle} onCancel={this.rollbackCancelHandle}
                       okText="确认" cancelText="取消"
                       confirmLoading={this.state.rollbackLoading}
                >
                    <FreightFormRollback initialValues={this.state.rollbackData} ref={this.saveFormRef}/>
                </Modal>
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

export default DoneFreightForm