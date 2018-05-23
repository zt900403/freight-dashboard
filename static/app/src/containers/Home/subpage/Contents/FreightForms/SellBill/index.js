/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {message, Form, DatePicker, Select, Table, Row, Col, Button} from 'antd';
import {getAllRecord, getDistinctPurchaser} from '../../../../../../fetch/FreightRecord'
import './style.css'
const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class BuyBill extends React.PureComponent {

    state = {
        searchLoading: false,
        tableData: [],
        purchasers: [],
    }

    handleSearch = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            if (values.rangePicker && values.rangePicker.length === 2) {
                values.rangePicker = values.rangePicker.map((item) => {
                    return item.format('YYYY-MM-DD')
                })
            }
            this.setState({
                searchLoading: true,
            })
            getAllRecord(values)
                .then((data) => {
                    this.setState({
                        tableData: data
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

    componentDidMount() {

        getDistinctPurchaser()
            .then((data) => {
                this.setState({
                    purchasers: data,
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
            render: (text, record) => {
                return record.date.split('T')[0]
            },
        }
            , {
                title: '品名',
                dataIndex: 'productName',
                key: 'productName',
            }, {
                title: '销售单位',
                dataIndex: 'ASellerCompany',
                key: 'ASellerCompany',
            }, {
                title: '数量',
                dataIndex: 'ASellAmount',
                key: 'ASellAmount',
            }, {
                title: '货物单价',
                dataIndex: 'ABuyUnitPrice',
                key: 'ABuyUnitPrice',
            }, {
                title: '小计',
                render: (text, record) => {
                    return parseFloat(record.ASellAmount) * parseFloat(record.ABuyUnitPrice)
                },
            }]

        const rangeConfig = {
            rules: [{type: 'array'}],
        };
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    // onSubmit={this.handleSearch}
                >
                    <Row gutter={6}>
                        <Col span={8}>
                            <FormItem label="">
                                {getFieldDecorator('purchaser', {
                                    rules: [
                                        {required: true, message: '选择采购贸易方!'},
                                    ],
                                })(
                                    <Select style={{width: 120}} placeholder="请选择采购贸易方!">
                                        {
                                            this.state.purchasers.map((purchaser, index) => {
                                                return <Option value={purchaser} key={index}>{purchaser}</Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="时间区间过滤"
                            >
                                {getFieldDecorator('rangePicker', rangeConfig)(
                                    <RangePicker />
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
                                   rowKey={record => record.id}/>
                        </div>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default Form.create()(BuyBill)