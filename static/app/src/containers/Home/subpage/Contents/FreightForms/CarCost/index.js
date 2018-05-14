/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {message, Form, DatePicker, InputNumber, Table, Icon, Select, Row, Col, Button} from 'antd';
import './style.css'
import {getDistinctCarNumber} from '../../../../../../fetch/FreightRecord'
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;

class CarCost extends React.PureComponent {

    state = {
        cars: [],
        searchLoading: false,
        tableLoading: false,
        tableData: [],
    }


    handleSearch = () => {

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
            title: '序号',
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
            title: '目的地A公司',
            dataIndex: 'targetACompany',
            key: 'targetACompany',
        }, {

            title: '目的地B公司',
            dataIndex: 'BConmpany',
            key: 'BC',
        }, {
            title: '目的地C公司',
            dataIndex: 'TC',
            key: 'TC',

        }, {
            title: '目的地D公司',
            dataIndex: 'TD',
            key: 'TD',
        }, {
            title: '吨位',
            dataIndex: 'tons',
            key: 'tons',
        }, {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: '小计',
            dataIndex: 'total',
            key: 'total',
        }, {
            title: '支出',
            dataIndex: 'cost',
            key: 'cost',
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
                                            this.state.cars.map((car) => {
                                                return <Option value={car}>{car}</Option>
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
                            <Button type="primary" htmlType="submit"><Icon type="search"/>搜索</Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="search-result-list">
                            <Table loading={this.state.tableLoading} columns={columns}
                                   dataSource={this.state.tableData}
                                   onChange={this.handleTableChange}
                                   rowKey={record => record.id}/>
                        </div>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p><strong>本月运费:</strong> 123</p>
                        </Col>
                        <Col span={6}>
                            <p><strong>本月支出:</strong> 123</p>
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
                            <Button type="primary">保存</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default Form.create()(CarCost)