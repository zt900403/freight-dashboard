/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber, message, DatePicker, Collapse, Form, Button, Input, Col, Row} from 'antd';
import {newFreightRecord} from '../../fetch/FreightRecord/index'
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class NewFreightForm extends React.PureComponent {
    state = {
        loading: false,
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                values.status = "STEP2"
                this.setState({
                    loading: true,
                })
                newFreightRecord(values)
                    .then((result) => {
                        message.info(result.message)
                    }).catch((err) => {
                    message.error(err.message)
                }).finally(() => {
                    this.setState({
                        loading: false,
                    })
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {
                    span: 12,
                },
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };

        const colspan = {
            span: 6
        }

        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={14}>
                                <FormItem
                                    label="标题"
                                    wrapperCol={{span: 20}}
                                    labelCol={{span: 4}}
                                >
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: '请输入标题!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="车辆名称"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('carNumber', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="日期"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('date', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <DatePicker placeholder="选择日期"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="品名"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('productName', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="采购贸易方"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('purchaser', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="A采购单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('APurchaseCompany', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="出发地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('startPlace', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售贸易方"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASeller', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASellerCompany', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="油井号"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('oilWellNumber', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASellPlace', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="运费单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('freightUnitPrice', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="运输费吨位调整"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('freightPriceTonsAdjust', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="其他增项"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('otherAddItem', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="留货车辆录入" key="2">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="留存车辆"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('keepCarNumber', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="留货车辆单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('keepCarUnitPrice', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="多点采购信息录入" key="3">
                    </Panel>
                    <Panel header="第三方贸易商信息录入" key="4">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售贸易方"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellPlace', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售贸易方"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellPlace', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售贸易方"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellPlace', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

                < FormItem
                    wrapperCol={{span: 12, offset: 0}
                    }
                >
                    <Button type="primary" loading={this.state.loading} htmlType="submit">提交</Button>
                </FormItem >
            </ Form >
        )
    }
}

export default Form.create()(NewFreightForm)
