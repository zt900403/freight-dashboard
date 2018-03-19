import React from 'react'
import {message, DatePicker, Table, Button, Modal, Form, Row, Col, Input, Icon} from 'antd';
import FreightFormDetail from '../../../../../../controllers/FreightFormDetail'
import FreightFormRollback from '../../../../../../controllers/FreightFormRollback'
import {updateOneRecord, deleteOneReocrd,} from '../../../../../../fetch/FreightRecord'

import './style.css'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
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
                this.props.deleteDoneFreightData(this.state.deleteID)
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.deleteConfirmCancelHandle()
        })
    }


    handleTableChange = (pagination) => {
        this.props.getNewData(pagination)
    }


    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err)
                return
            }
            if (values.rangePicker && values.rangePicker.length === 2) {
                values.rangePicker = values.rangePicker.map((item) => {
                    return item.format('YYYY-MM-DD')
                })
            }
            if (values.id || values.title || (values.rangePicker && values.rangePicker.length === 2)) {
                values.id = values.id ? values.id.trim() : null
                values.title = values.title ? values.title.trim() : null
                values.rangePicker = values.rangePicker ?
                    values.rangePicker.length === 2 ? values.rangePicker : null
                    : null

            }
            this.props.getNewData(null, values)
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
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
        const {getFieldDecorator} = this.props.form;
        const rangeConfig = {
            rules: [{type: 'array'}],
        };
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={6}>
                        <Col span={4}>
                            <FormItem label="单号">
                                {getFieldDecorator('id')(
                                    <Input placeholder="单号搜索"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="标题">
                                {getFieldDecorator('title')(
                                    <Input placeholder="关键字搜索"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="时间区间过滤"
                            >
                                {getFieldDecorator('rangePicker', rangeConfig)(
                                    <RangePicker />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit"><Icon type="search"/>搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                清除
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="search-result-list">
                    <Table loading={this.props.loading} columns={columns}
                           dataSource={this.props.data}
                           pagination={this.props.pagination}
                           onChange={this.handleTableChange}
                           rowKey={record => record.id}/>


                </div>
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
        );
    }
}

export default Form.create()(DoneFreightForm)