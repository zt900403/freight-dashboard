/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {message, Form, DatePicker, InputNumber, Table, Icon, Select, Row, Col, Button} from 'antd';
import './style.css'
import {getDistinctCarNumber, getCarCostDetail} from '../../../../../../fetch/FreightRecord'
import {updateOrUpsert, getCarCost} from '../../../../../../fetch/CarCost'
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
        realFreightTotal: 0,
        profit: 0,
        loan: 0,
        rentAndMealFee: 0,
        driverSalary: 0,
        saveLoading: false,
    }

    handleLoanChange = (newValue) => {
        const rentAndMealFee = this.props.form.getFieldValue('rentAndMealFee')
        this.setState({
            realFreightTotal: this.state.freightTotal - newValue - rentAndMealFee,
        })
    }

    handleRentAndMealFeeChange = (newValue) => {
        const loan = this.props.form.getFieldValue('loan')
        const driverSalary = this.props.form.getFieldValue('driverSalary')
        this.setState({
            realFreightTotal: this.state.freightTotal - newValue - loan,
            profit: this.state.freightTotal - this.state.totalOutput - driverSalary - newValue
        })

    }

    handleDriverSalaryChange = (newValue) => {
        const rentAndMealFee = this.props.form.getFieldValue('rentAndMealFee')
        this.setState({
            profit: this.state.freightTotal - this.state.totalOutput - rentAndMealFee - newValue
        })
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
                    const totalOutput = proData.reduce((acc, curr) => {
                        return acc + this.toFloat(curr.carTotalCost)
                    }, 0)
                    this.setState({
                        tableData: proData,
                        freightTotal,
                        totalOutput,
                    })

                    values.month += 1
                    getCarCost(values)
                        .then((data) => {
                            if (data.length !== 0) {
                                const obj = {
                                    driverSalary: data[0].driverSalary,
                                    loan: data[0].loan,
                                    rentAndMealFee: data[0].rentAndMealFee,
                                }
                                this.setState(obj)
                                this.props.form.setFieldsValue(obj)
                            }
                        }).catch((err) => {
                        message.error(err.message)
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
    handleSave = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            this.setState({
                saveLoading: true,
            })
            const moment = values.date
            values.date = moment.year() + '-' + (moment.month() + 1)
            updateOrUpsert(values)
                .then((data) => {
                    message.info(data.message)
                }).catch((err) => {
                message.error(err.message)
            }).then(() => {
                this.setState({
                    saveLoading: false,
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
        }, {
            title: '品名',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '起始地',
            dataIndex: 'startPlace',
            key: 'startPlace',
        }, {
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
                            <Button type="primary" onClick={this.handleSearch}
                                    loading={this.state.searchLoading}>搜索</Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="search-result-list">
                            <Table columns={columns}
                                   dataSource={this.state.tableData}
                                   onChange={this.handleTableChange}
                                   rowKey={record => record.id}/>
                        </div>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p><strong>本月运费: </strong>
                                <span className="red">
                                {
                                    this.state.freightTotal
                                }
                                </span>
                            </p>
                        </Col>
                        <Col span={6}>
                            <p><strong>本月支出: </strong>
                                <span className="red">
                                {
                                    this.state.totalOutput
                                }
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                label="借款"
                            >
                                {getFieldDecorator('loan', {
                                    initialValue: this.state.loan
                                })(
                                    <InputNumber onChange={this.handleLoanChange}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="司机工资"
                            >
                                {getFieldDecorator('driverSalary', {
                                    initialValue: this.state.driverSalary
                                })(
                                    <InputNumber onChange={this.handleDriverSalaryChange}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="房租餐费"
                            >
                                {getFieldDecorator('rentAndMealFee', {
                                    initialValue: this.state.rentAndMealFee
                                })(
                                    <InputNumber onChange={this.handleRentAndMealFeeChange}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p><strong>本月实际运费: </strong>
                                <span className="red">
                                {
                                    this.state.realFreightTotal
                                }
                                </span>
                            </p>
                        </Col>
                        <Col span={6}>
                            <p><strong>本月利润: </strong>
                                <span className="red">
                                {
                                    this.state.profit
                                }
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Button type="primary" onClick={this.handleSave}
                                    loading={this.state.saveLoading}>保存</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default Form.create()(CarCost)