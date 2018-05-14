/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {message, Form, DatePicker, InputNumber, Table, Icon, Select, Row, Col, Button} from 'antd';
import './style.css'
import {getDistinctCarNumber, getCarCostDetail} from '../../../../../../fetch/FreightRecord'
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;

class CarCost extends React.PureComponent {

    state = {
        cars: [],
        searchLoading: false,
        tableLoading: false,
        tableData: [],
        freightTotal: 0,
        totalOutput: 0,

    }


    handleSearch = (e) => {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            this.setState({
                searchLoading: true,
            })
            getCarCostDetail(values)
                .then((data) => {
                    const proData = this.tableDataProcess(data)
                    const freightTotal = proData.reduce((acc, curr) => {
                        return acc + curr.freightSubtotal
                    }, 0)
                    const totalOutput =  proData.reduce((acc, curr) => {
                        return acc + this.toFloat(curr.carTotalCost)
                    }, 0)
                    this.setState({
                        tableData: proData,
                        freightTotal,
                        totalOutput,
                    })
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    searchLoading: false,
                })
            })

        });

    }

    toFloat = (num) => {
        return parseFloat(num) || 0
    }
    tableDataProcess = (data) => {
        return data.map((item) => {
            item.date = item.year + '/' + item.month + '/' + item.day
            const APurchaseAmount = this.toFloat(item.APurchaseAmount)
            const BPurchaseAmount = this.toFloat(item.BPurchaseAmount)
            item.tons = APurchaseAmount + BPurchaseAmount
            item.freightSubtotal = this.toFloat(item.freightUnitPrice) * this.toFloat(item.freightPriceTonsAdjust)
            return item
        })
    }

    componentDidMount() {

        getDistinctCarNumber()
            .then((data) => {
                this.setState({
                    cars: data,
                })
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const config = {
            rules: [{type: 'object', required: true, message: 'Please select time!'}],
        }

        const columns = [{
            title: '单号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },{
            title: '品名',
            dataIndex: 'productName',
            key: 'productName',
        },{
            title: '起始地',
            dataIndex: 'startPlace',
            key: 'startPlace',
        },{
            title: 'A销售单位',
            dataIndex: 'ASellerCompany',
            key: 'ASellerCompany',
        }, {

            title: 'B销售单位',
            dataIndex: 'BSellerCompany',
            key: 'BSellerCompany',
        }, {
            title: 'C销售单位',
            dataIndex: 'CSellerCompany',
            key: 'CSellerCompany',

        }, {
            title: 'D销售单位',
            dataIndex: 'DSellerCompany',
            key: 'DSellerCompany',
        }, {
            title: '吨位',
            dataIndex: 'tons',
            key: 'tons',
        }, {
            title: '运费单价',
            dataIndex: 'freightUnitPrice',
            key: 'freightUnitPrice',
        }, {
            title: '运费小计',
            dataIndex: 'freightSubtotal',
            key: 'freightSubtotal',
        }, {
            title: '支出',
            dataIndex: 'carTotalCost',
            key: 'carTotalCost',
        }]
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    // onSubmit={this.handleSearch}
                >
                    <Row gutter={6}>
                        <Col span={8}>
                            <FormItem label="车牌号">
                                {getFieldDecorator('carNumber', {
                                    rules: [
                                        {required: true, message: '请选择车牌号!'},
                                    ],
                                })(
                                    <Select style={{width: 120}} placeholder="请选择车牌号!">
                                        {
                                            this.state.cars.map((car, index) => {
                                                return <Option value={car} key={index}>{car}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="账期"
                            >
                                {getFieldDecorator('date', config)(
                                    <MonthPicker />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} style={{textAlign: 'right'}}>
                            <Button type="primary" onClick={this.handleSearch} loading={this.state.searchLoading}>搜索</Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="search-result-list">
                            <Table  columns={columns}
                                   dataSource={this.state.tableData}
                                   onChange={this.handleTableChange}
                                   rowKey={record => record.id}/>
                        </div>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p><strong>本月运费:</strong>
                                {
                                    this.state.freightTotal
                                }
                            </p>
                        </Col>
                        <Col span={6}>
                            <p><strong>本月支出:</strong>
                                {
                                    this.state.totalOutput
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="借款"
                            >
                                {getFieldDecorator('loan')(
                                    <InputNumber/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="司机工资"
                            >
                                {getFieldDecorator('driverSalary')(
                                    <InputNumber/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="房租餐费"
                            >
                                {getFieldDecorator('rentAndMealFee')(
                                    <InputNumber/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p><strong>本月实际运费:</strong>
                                {
                                    this.state.tableData.reduce((acc, curr) => {
                                        return acc + this.toFloat(curr.carTotalCost)
                                    }, 0)
                                }
                            </p>
                        </Col>
                        <Col span={6}>
                            <p><strong>本月利润:</strong>
                                {
                                    this.state.tableData.reduce((acc, curr) => {
                                        return acc + this.toFloat(curr.carTotalCost)
                                    }, 0)
                                }
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Button type="primary">保存</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default Form.create()(CarCost)