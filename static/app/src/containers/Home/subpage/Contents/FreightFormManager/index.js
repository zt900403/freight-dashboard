/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber,message, DatePicker, Collapse, Form, Button, Input, Col, Row} from 'antd';
import {saveFreightRecord} from '../../../../../fetch/FreightRecord'
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class FreightFormManager extends React.PureComponent {
    clickHandle = (key) => {
        console.log(key)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                console.log(values)
                saveFreightRecord(values)
                    .then((result) => {
                        message.info(result.message)
                    }).catch((err) => {
                    message.error(err.message)
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <FormItem
                            label="标题"
                            labelCol={{span: 1}}
                            wrapperCol={{span: 23}}
                        >
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: '请输入标题!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                <FormItem
                                    label="车辆名称"
                                >
                                    {getFieldDecorator('carNumber', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="日期"
                                >
                                    {getFieldDecorator('date', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <DatePicker placeholder="选择日期"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="品名"
                                >
                                    {getFieldDecorator('productName', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="采购贸易方"
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
                            <Col span={6}>
                                <FormItem
                                    label="A采购单位"
                                >
                                    {getFieldDecorator('APurchaseCompany', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="出发地"
                                >
                                    {getFieldDecorator('startPlace', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售贸易方"
                                >
                                    {getFieldDecorator('ASeller', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售单位"
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
                            <Col span={6}>
                                <FormItem
                                    label="油井号"
                                >
                                    {getFieldDecorator('oilWellNumber', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售地"
                                >
                                    {getFieldDecorator('ASellPlace', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="运费单价"
                                >
                                    {getFieldDecorator('freightUnitPrice', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="运输费吨位调整"
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
                            <Col span={6}>
                                <FormItem
                                    label="其他增项"
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
                            <Col span={6}>
                                <FormItem
                                    label="留存车辆"
                                >
                                    {getFieldDecorator('keepCarNumber', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="留货车辆单价"
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
                            <Col span={8}>
                                <FormItem
                                    label="B销售贸易方"
                                >
                                    {getFieldDecorator('BSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="B销售单位"
                                >
                                    {getFieldDecorator('BSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="B销售地"
                                >
                                    {getFieldDecorator('BSellPlace', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="C销售贸易方"
                                >
                                    {getFieldDecorator('CSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="C销售单位"
                                >
                                    {getFieldDecorator('CSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="C销售地"
                                >
                                    {getFieldDecorator('CSellPlace', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="D销售贸易方"
                                >
                                    {getFieldDecorator('DSeller', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="D销售单位"
                                >
                                    {getFieldDecorator('DSellerCompany', {})(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="D销售地"
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
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem >
            </ Form >
        )
    }
}

export default Form.create()(FreightFormManager)
