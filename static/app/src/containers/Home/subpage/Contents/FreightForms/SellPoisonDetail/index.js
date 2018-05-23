/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {message, Form, DatePicker, InputNumber, Table, Row, Col, Button} from 'antd';
import {getPoisonRecords} from '../../../../../../fetch/FreightRecord'
import './style.css'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class SellPoisonDetail extends React.PureComponent {

    state = {
        searchLoading: false,
        tableData: []
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
            getPoisonRecords(values)
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
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            render: (text, record) => {
                return record.date.split('T')[0]
            }
        }
            , {
                title: '品名',
                dataIndex: 'sellPoisonName',
                key: 'sellPoisonName',
            }, {
                title: '购买单位',
                dataIndex: 'sellPoisonBuyCompany',
                key: 'sellPoisonBuyCompany',
            }, {
                title: '购买人',
                dataIndex: 'sellPoisonBuyer',
                key: 'sellPoisonBuyer',
            }, {
                title: '总数量',
                render: (text, record) => {
                    let a = parseFloat(record.poisonANumber)
                    let b = parseFloat(record.poisonBNumber)
                    if (!isNaN(b)) {
                        return a + b
                    }
                    return a
                }
            }, {
                title: '数量',
                dataIndex: 'sellPoisonNumber',
                key: 'sellPoisonNumber',
            }, {
                title: '购买证号',
                dataIndex: 'poisonBuyLicense',
                key: 'poisonBuyLicense',
            }, {
                title: '运输证件号',
                dataIndex: 'poisonTransportLicense',
                key: 'poisonTransportLicense',
            }, {
                title: '提货单位',
                dataIndex: 'sellPoisonTakeCompany',
                key: 'sellPoisonTakeCompany',
            }, {
                title: '车号',
                dataIndex: 'carNumber',
                key: 'carNumber',
            }, {
                title: '运往地',
                dataIndex: 'sellPoisonDestination',
                key: 'sellPoisonDestination',
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

export default Form.create()(SellPoisonDetail)