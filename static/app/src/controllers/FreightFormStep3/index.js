/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {InputNumber, Collapse, Form, Col, Row} from 'antd';
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


        const data = this.props.initialValues;

        return (
            <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <p><strong>A销售单位:</strong> {data.ASellerCompany} </p>
                            </Col>
                            <Col {...colspan}>
                                <p><strong>A销售地:</strong> {data.ASellPlace}</p>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="A采购单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ABuyUnitPrice', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.ABuyUnitPrice : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A补贴运费"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('AFreightSubsidy', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.AFreightSubsidy : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASellUnitPrice', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.ASellUnitPrice : '',
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
                            <Col {...colspan}>
                                <FormItem
                                    label="B采购单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BBuyUnitPrice', {
                                        rules: [],
                                        initialValue: data ? data.BBuyUnitPrice : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B补贴运费"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BFreightSubsidy', {
                                        rules: [],
                                        initialValue: data ? data.BFreightSubsidy : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="第三方贸易商信息录入" key="4">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <p><strong>B销售单位:</strong> {data.BSellerCompany}</p>
                            </Col>
                            <Col {...colspan}>
                                <p><strong>B销售地: </strong>{data.BSellPlace}</p>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellUnitPrice', {

                                        initialValue: data ? data.BSellUnitPrice : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <p><strong>C销售单位:</strong> {data.CSellerCompany}</p>
                            </Col>
                            <Col {...colspan}>
                                <p><strong>C销售地: </strong>{data.CSellPlace}</p>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellUnitPrice', {

                                        initialValue: data ? data.CSellUnitPrice : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <p><strong>D销售单位:</strong> {data.DSellerCompany}</p>
                            </Col>
                            <Col {...colspan}>
                                <p><strong>D销售地: </strong>{data.DSellPlace}</p>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售单价"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellUnitPrice', {

                                        initialValue: data ? data.DSellUnitPrice : '',
                                    })(
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
