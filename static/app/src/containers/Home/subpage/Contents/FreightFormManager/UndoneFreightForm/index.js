import React from 'react'
import {Table, Button, message} from 'antd';
import EditModal from '../../../../../../controllers/EditModal'
import FreightFormStep1 from '../../../../../../controllers/FreightFormStep1'
import FreightFormStep2 from '../../../../../../controllers/FreightFormStep2'
import FreightFormStep3 from '../../../../../../controllers/FreightFormStep3'
import FreightFormStep4 from '../../../../../../controllers/FreightFormStep4'
import {updateOneRecord, getUndoneRecord} from '../../../../../../fetch/FreightRecord'
class UndoneFreightForm extends React.PureComponent {

    state = {
        data: [],
        dataLoading: false,
        id: -1,
        modalVisible: false,
        editModalChildren: <div />,
        loading: false,
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

    componentDidMount() {
        this.setState({
            dataLoading: true,
        })
        getUndoneRecord()
            .then((result) => {
                this.setState({
                    data: result,
                })
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.setState({
                dataLoading: false,
            })
        })
    }

    componentDidUpdate() {

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
                        (status === 'STEP4' && authority.includes('STEP4'))) {

                        return <Button type="primary" onClick={this.showModal.bind(this, record.id)}>修改</Button >
                    }

                }
            }
        }];


        return (
            <div>
                <Table loading={this.state.dataLoading} columns={columns}
                       dataSource={this.state.data}
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
            </div>
        )
    }
}


export default UndoneFreightForm

