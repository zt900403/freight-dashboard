/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber,message, DatePicker, Collapse, Form, Button, Input, Col, Row} from 'antd';
import {newFreightRecord} from '../../fetch/FreightRecord/index'
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class FreightFormStep2 extends React.PureComponent {

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
        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                <FormItem
                                    label="A采购量"
                                >
                                    {getFieldDecorator('APurchaseAmount', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售量"
                                >
                                    {getFieldDecorator('ASellAmount', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售量调整"
                                >
                                    {getFieldDecorator('ASellAmountAdjust', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="车辆费用支出合计"
                                >
                                    {getFieldDecorator('carTotalCost', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="留存车辆信息录入" key="2">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="留货量"
                                >
                                    {getFieldDecorator('keepProductAmount', {})(
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
                                    label="库补装量"
                                >
                                    {getFieldDecorator('warehouseSupplement', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="B销售量"
                                >
                                    {getFieldDecorator('BSellAmount', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="B销售量调整"
                                >
                                    {getFieldDecorator('BSellAmountAdjust', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="C销售量"
                                >
                                    {getFieldDecorator('CSellAmount', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="C销售量调整"
                                >
                                    {getFieldDecorator('CSellAmountAdjust', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="D销售量"
                                >
                                    {getFieldDecorator('DSellAmount', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="D销售量调整"
                                >
                                    {getFieldDecorator('DSellAmountAdjust', {})(
                                        <InputNumber />
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
                </FormItem >
            </ Form >
        )
    }
}

export default Form.create()(FreightFormStep2)
