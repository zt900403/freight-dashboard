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
            title: '车辆',
            dataIndex: 'carNumber',
            key: 'carNumber',
        }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => {
                return record.date.split('T')[0]
            },
        }, {
            title: '品名',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '采购贸易方',
            dataIndex: 'purchaser',
            key: 'purchaser',
        }, {
            title: 'A采购单位',
            dataIndex: 'APurchaseCompany',
            key: 'APurchaseCompany',
        }, {
            title: 'A采购量',
            dataIndex: 'APurchaseAmount',
            key: 'APurchaseAmount',
        }, {
            title: '运费单价',
            dataIndex: 'freightUnitPrice',
            key: 'freightUnitPrice',
        }, {
            title: '运费吨位调整',
            dataIndex: 'freightPriceTonsAdjust',
            key: 'freightPriceTonsAdjust',
        }, {
            title: '其他增项',
            dataIndex: 'otherAddItem',
            key: 'otherAddItem',
        }, {
            title: 'A采购单价',
            dataIndex: 'ABuyUnitPrice',
            key: 'ABuyUnitPrice',
        }, {
            title: 'A采购小计价',
            render: (text, record) => {
                return parseFloat(record.APurchaseAmount) * parseFloat(record.ABuyUnitPrice)
            },
        }, {
            title: 'A补贴运费',
            dataIndex: 'AFreightSubsidy',
            key: 'AFreightSubsidy',
        }, {
            title: 'A补贴运费小计',
            render: (text, record) => {
                return parseFloat(record.APurchaseAmount) * parseFloat(record.AFreightSubsidy)
            },
        }, {
            title: '运费小计',
            render: (text, record) => {
                return parseFloat(record.freightUnitPrice) * parseFloat(record.freightPriceTonsAdjust)
                    + parseFloat(record.otherAddItem)
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