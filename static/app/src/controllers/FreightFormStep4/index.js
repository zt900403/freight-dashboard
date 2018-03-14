/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber,message, DatePicker, Collapse, Form, Button, Input, Col, Row} from 'antd';
import {newFreightRecord} from '../../fetch/FreightRecord/index'
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class FreightFormStep3 extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.onSubmit()
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
                <Collapse bordered={false} defaultActiveKey={['1','2']}>
                    <Panel header="易制毒购入明细" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="品名"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('poisonName', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A数量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('poisonANumber', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B数量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('poisonBNumber', {
                                        rules: [{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <Col {...colspan}>
                            <FormItem
                                label="购买证号"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('poisonBuyLicense', {
                                    rules: [{required: true, message: '请输入!'}],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colspan}>
                            <FormItem
                                label="运输证号"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('poisonTransportLicense', {
                                    rules: [{required: true, message: '请输入!'}],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colspan}>
                            <FormItem
                                label="运往地"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('poisonDestination', {
                                    rules: [{required: true, message: '请输入!'}],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    </Panel>
                    <Panel header="易制毒销售明细" key="2">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>

                            <Col {...colspan}>
                                <FormItem
                                    label="购买单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonBuyCompany', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="购买人"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonBuyer', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="品名"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonName', {
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
                                    label="数量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonNumber', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="提货单位"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonTakeCompany', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="运往地"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('sellPoisonDestination', {
                                        rules: [{required: true, message: '请输入!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </ Form >
        )
    }
}

export default Form.create()(FreightFormStep3)
