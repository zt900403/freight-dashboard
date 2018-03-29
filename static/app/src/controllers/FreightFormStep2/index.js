/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {Checkbox, InputNumber, Collapse, Form, Col, Row} from 'antd';
import './style.css'


const Panel = Collapse.Panel
const FormItem = Form.Item

class FreightFormStep2 extends React.PureComponent {

    state = {
        needZhebaiCalc: this.props.initialValues.needZhebaiCalc,
    }
    add = (a, b) => {
        return parseFloat(a) + parseFloat(b)
    }

    multiply = (a, b) => {
        return parseFloat(a) * parseFloat(b)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.onSubmit()
            }
        });
    }

    handleZhebaiCheckboxChange = (e) => {
        this.setState({
            needZhebaiCalc: e.target.checked,
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {
                    span: 14,
                },
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
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
                                <FormItem
                                    label="A采购量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('APurchaseAmount', {
                                        rules: [{required: true, message: '请输入!'}],
                                        initialValue: data ? data.APurchaseAmount : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASellAmount', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.ASellAmount : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售量调整"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('ASellAmountAdjust', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.ASellAmountAdjust : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="车辆费用支出合计"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('carTotalCost', {
                                        rules: [{required: true, message: '请输入!'},],
                                        initialValue: data ? data.carTotalCost : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem>
                                    {getFieldDecorator('needZhebaiCalc', {
                                        valuePropName: 'checked',
                                        initialValue: data ? data.needZhebaiCalc : false,

                                    })(
                                        <Checkbox
                                            onChange={this.handleZhebaiCheckboxChange}>
                                            需要按照折百计算</Checkbox>
                                    )}
                                </FormItem>
                            </Col>
                            { this.state.needZhebaiCalc ? (
                                <div>
                                    <Col {...colspan}>
                                        <FormItem
                                            label="浓度(%)"
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('concentration', {
                                                rules: [{required: true, message: '请输入!'},],
                                                initialValue: data ? data.concentration : 0,
                                            })(
                                                <InputNumber
                                                    min={0}
                                                    max={100}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}
                                                />
                                            )}
                                        </FormItem>

                                    </Col>
                                </div>
                            )
                                :
                                ''
                            }
                        </Row>
                    </Panel>
                    <Panel header="留存车辆信息录入" key="2">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="留货量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('keepProductAmount', {

                                        initialValue: data ? data.keepProductAmount : '',
                                    })(
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
                                    label="库补装量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('warehouseSupplement', {

                                        initialValue: data ? data.warehouseSupplement : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellAmount', {

                                        initialValue: data ? data.BSellAmount : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售量调整"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellAmountAdjust', {

                                        initialValue: data ? data.BSellAmountAdjust : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellAmount', {

                                        initialValue: data ? data.CSellAmount : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售量调整"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellAmountAdjust', {

                                        initialValue: data ? data.CSellAmountAdjust : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellAmount', {

                                        initialValue: data ? data.DSellAmount : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售量调整"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellAmountAdjust', {

                                        initialValue: data ? data.DSellAmountAdjust : '',
                                    })(
                                        <InputNumber />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

            </Form>
        )
    }
}

export default Form.create()(FreightFormStep2)
