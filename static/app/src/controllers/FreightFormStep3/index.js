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
        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                <FormItem
                                    label="A采购单价"
                                >
                                    {getFieldDecorator('ABuyUnitPrice', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A补贴运费"
                                >
                                    {getFieldDecorator('AFreightSubsidy', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="A销售单价"
                                >
                                    {getFieldDecorator('ASellUnitPrice', {
                                        rules: [{required: true, message: '请输入!'},{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="留存车辆信息录入" key="2">
                    </Panel>
                    <Panel header="多点采购信息录入" key="3">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                <FormItem
                                    label="B采购单价"
                                >
                                    {getFieldDecorator('BBuyUnitPrice', {
                                        rules: [{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="B补贴运费"
                                >
                                    {getFieldDecorator('BFreightSubsidy', {
                                        rules: [{type: 'number'}],
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="第三方贸易商信息录入" key="4">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="B销售单价"
                                >
                                    {getFieldDecorator('BSellUnitPrice', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <FormItem
                                    label="C销售单价"
                                >
                                    {getFieldDecorator('CSellUnitPrice', {})(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="D销售单价"
                                >
                                    {getFieldDecorator('DSellUnitPrice', {})(
                                        <InputNumber />
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
