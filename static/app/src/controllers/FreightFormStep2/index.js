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
        AZhebai: -1,
        BZhebai: -1,
        CZhebai: -1,
        DZHebai: -1,
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

    handleZhebaiChange = (newValue) => {
        this.setState({
            AZhebai: (this.props.form.getFieldValue('ASellAmount') * newValue * 0.01).toFixed(2),
            BZhebai: (this.props.form.getFieldValue('BSellAmount') * newValue * 0.01).toFixed(2),
            CZhebai: (this.props.form.getFieldValue('CSellAmount') * newValue * 0.01).toFixed(2),
            DZhebai: (this.props.form.getFieldValue('DSellAmount') * newValue * 0.01).toFixed(2),
        })
    }
    handleXSellAmountChange = (x) => {
        let concentration = this.props.form.getFieldValue('concentration')
        return (newValue) => {
            let obj = {}
            obj[x + 'Zhebai'] = (concentration * newValue * 0.01).toFixed(2)
            this.setState(obj)
        }
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
                                    label="出发地"
                                    {...formItemLayout}
                                >
                                    {
                                        data ? data.startPlace : ''
                                    }
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="A销售地"
                                    {...formItemLayout}
                                >
                                    {
                                        data ? data.ASellPlace : ''
                                    }
                                </FormItem>
                            </Col>
                        </Row>
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
                                        <InputNumber onChange={this.handleXSellAmountChange('A')}/>
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
                                                onChange={this.handleZhebaiChange}
                                                min={0}
                                                max={100}
                                                formatter={value => `${value}%`}
                                                parser={value => value.replace('%', '')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            )
                                : ''
                            }
                            { this.state.needZhebaiCalc ?
                                (
                                    <Col {...colspan}>
                                        <FormItem>
                                            <p><strong>A折百</strong><span className="red">{this.state.AZhebai}</span></p>
                                        </FormItem>
                                    </Col>
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
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="B采购量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BPurchaseAmount', {
                                        initialValue: data ? data.BPurchaseAmount : '',

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
                                    label="B销售地"
                                    {...formItemLayout}
                                >
                                    {
                                        data ? data.BSellPlace : ''
                                    }
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="B销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BSellAmount', {

                                        initialValue: data ? data.BSellAmount : '',
                                    })(
                                        <InputNumber onChange={this.handleXSellAmountChange('B')}/>
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
                            {
                                this.state.needZhebaiCalc ?
                                    (
                                        <Col {...colspan}>
                                            <FormItem>
                                                <p><strong>B折百</strong><span className="red">{this.state.BZhebai}</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    )
                                    :
                                    ''
                            }
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售地"
                                    {...formItemLayout}
                                >
                                    {
                                        data ? data.CSellPlace : ''
                                    }
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="C销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('CSellAmount', {

                                        initialValue: data ? data.CSellAmount : '',
                                    })(
                                        <InputNumber onChange={this.handleXSellAmountChange('C')}/>
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
                            {
                                this.state.needZhebaiCalc ?
                                    (
                                        <Col {...colspan}>
                                            <FormItem>
                                                <p><strong>C折百</strong><span
                                                    className="red">{this.state.CZhebai}</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    )
                                    :
                                    ''
                            }
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售地"
                                    {...formItemLayout}
                                >
                                    {
                                        data ? data.DSellPlace : ''
                                    }
                                </FormItem>
                            </Col>
                            <Col {...colspan}>
                                <FormItem
                                    label="D销售量"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('DSellAmount', {

                                        initialValue: data ? data.DSellAmount : '',
                                    })(
                                        <InputNumber onChange={this.handleXSellAmountChange('D')}/>
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
                            {
                                this.state.needZhebaiCalc ?
                                    (
                                        <Col {...colspan}>
                                            <FormItem>
                                                <p><strong>D折百</strong><span
                                                    className="red">{this.state.DZhebai}</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    )
                                    :
                                    ''
                            }
                        </Row>
                    </Panel>
                    <
                    / Collapse >

                    <
                    / Form >
                    )
                    }
                    }

                    export default Form.create()(FreightFormStep2)
