import React from 'react'
import {Table, Button, message} from 'antd';
import EditModal from '../../../../../../controllers/EditModal'
import FreightFormStep2 from '../../../../../../controllers/FreightFormStep2'
import FreightFormStep3 from '../../../../../../controllers/FreightFormStep3'
import FreightFormStep4 from '../../../../../../controllers/FreightFormStep4'
import {updateOneRecord} from '../../../../../../fetch/FreightRecord'
class UndoneFreightForm extends React.PureComponent {

    state = {
        id: -1,
        modalVisible: false,
        editModalChildren: <div />,
    }

    showModal = (id) => {
        let step = '';
        this.props.data.forEach((item, index) => {
            if (item.id === id) {
                step = item.status
            }
        })

        let authority = []
        if (this.props.userinfo && this.props.userinfo.authority) {
            authority = this.props.userinfo.authority
            if (step === 'STEP2' && authority.includes('STEP2')) {
                this.setState({
                    id,
                    modalVisible: true,
                    editModalChildren: <FreightFormStep2 ref={this.saveFormRef}/>
                })
            }

            if (step === 'STEP3' && authority.includes('STEP3')) {
                this.setState({
                    id,
                    modalVisible: true,
                    editModalChildren: <FreightFormStep3 ref={this.saveFormRef}/>
                })
            }
            if (step === 'STEP4' && authority.includes('STEP4')) {
                this.setState({
                    id,
                    modalVisible: true,
                    editModalChildren: <FreightFormStep4 ref={this.saveFormRef}/>
                })
            }

        }
    }

    handleCancel = () => {
        this.setState({modalVisible: false});
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({modalVisible: false});

            let target;
            let i;
            this.props.data.forEach((item, index) => {
                if (item.id === this.state.id) {
                    target = item;
                    i = index
                }
            })

            let n = target.status.slice(-1)
            if (n == '4') {
                values.status = 'DONE'
            }
            else {
                values.status = 'STEP' + (parseInt(n) + 1)
            }
            this.props.data[i] = Object.assign({}, this.props.data[i], values)
            updateOneRecord(this.state.id, values)
                .then((result) => {
                    message.info(result.message)
                    this.props.updateUndoneFormData(this.props.data)
                }).catch((err) => {
                message.error(err.message)
            })
        });
    }
    saveFormRef = (form) => {
        this.form = form;
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
            title: '车辆名称',
            dataIndex: 'carNumber',
            key: 'carNumber',
        }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '动作',
            key: 'action',
            render: (text, record) => {
                if (this.props.userinfo &&
                    this.props.userinfo.authority) {
                    let authority = this.props.userinfo.authority
                    let status = record.status
                    if ((status != 'DONE')
                        && (authority.includes('STEP2')) || authority.includes('STEP3') || authority.includes('STEP4'))
                        return <Button type="primary" onClick={this.showModal.bind(this, record.id)}>修改</Button >

                }
            }
        }];


        return (
            <div>
                <Table columns={columns} dataSource={this.props.data}/>
                <EditModal
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                >
                    {this.state.editModalChildren}
                </EditModal>
            </div>
        )
    }
}


export default UndoneFreightForm

