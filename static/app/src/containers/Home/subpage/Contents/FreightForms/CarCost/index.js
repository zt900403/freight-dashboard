/**
 * Created by zhang on 18/05/10.
 */
import React from 'react'
import {Form, DatePicker, Input, Select, Row, Col, Button} from 'antd';
import './style.scss'
const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;

class CarCost extends React.PureComponent {

    state = {
        cars: ['123', '345'],
    }

    handleCarNumberChnage = (value) => {
        alert(value)
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <div>
                    <Form
                        className="ant-advanced-search-form"
                        // onSubmit={this.handleSearch}
                    >
                        <Row gutter={6}>
                            <Col span={8}>
                                <FormItem label="车牌号">
                                    <Select style={{width: 120}} placeholder="请选择车牌号!">
                                        {
                                            this.state.cars.map((car) => {
                                                return <Option value={car}>{car}</Option>
                                            })
                                        }
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                
                            </Col>
                        </Row>
                    </Form>

            </div>
        )
    }
}

export default Form.create()(CarCost)