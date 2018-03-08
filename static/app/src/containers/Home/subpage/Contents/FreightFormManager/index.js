/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {Collapse, Form, Button, Input, Col, Row} from 'antd';

const Panel = Collapse.Panel
const FormItem = Form.Item
class FreightFormManager extends React.PureComponent {
    clickHandle = (key) => {
        console.log(key)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header="基本录入" key="1">
                        <FormItem
                            label="标题"
                            labelCol={{span: 1}}
                            wrapperCol={{span: 23}}
                        >
                            {getFieldDecorator('note', {
                                rules: [{required: true, message: '请输入标题!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                                <FormItem
                                    label="标题"

                                    labelCol={{span: 1}}
                                    wrapperCol={{span: 7}}
                                >
                                    {getFieldDecorator('note', {
                                        rules: [{required: true, message: '请输入标题!'}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                        <FormItem
                            label="标题"

                            labelCol={{span: 1}}
                            wrapperCol={{span: 7}}
                        >
                            {getFieldDecorator('note', {
                                rules: [{required: true, message: '请输入标题!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Panel>
                    <Panel header="留货车辆录入" key="2">
                    </Panel>
                    <Panel header="多点采购信息录入" key="3">
                    </Panel>
                    <Panel header="第三方贸易商信息录入" key="4">
                    </Panel>
                </Collapse>

                <FormItem
                    wrapperCol={{span: 12, offset: 0}}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FreightFormManager)
