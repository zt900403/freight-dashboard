/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber,message, DatePicker, Collapse, Form, Button, Input, Col, Row} from 'antd';
import {newFreightRecord} from '../../fetch/FreightRecord/index'
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class NewFreightForm extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                values.status = "STEP2"
                newFreightRecord(values)
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

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {
                    span: 4,
                },
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <FormItem
                            label="标题"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: '请输入标题!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col>
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
                                    labelCol={{span:12}}
                                    wrapperCol={{span:12}}
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

export default Form.create()(NewFreightForm)
