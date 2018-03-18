import React from 'react'
import {Form, Select} from 'antd';
const Option = Select.Option
const FormItem = Form.Item

class FreightFormRollback extends React.PureComponent {


    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {
                    span: 6,
                    offset: 0,
                },
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };

        const data = this.props.initialValues
        return (
            <Form >
                <FormItem
                    label="回退到流程"
                    {...formItemLayout}
                >
                    {getFieldDecorator('status', {
                        rules: [{ required: true, message: '请选择回退到的流程!' }],
                        initialValue: data.status
                    })(
                        <Select placeholder="请选择回退到的流程">
                            <Option value="STEP1">流程一</Option>
                            <Option value="STEP2">流程二</Option>
                            <Option value="STEP3">流程三</Option>
                            { data.needPoisonInfo ? <Option value="STEP4">流程四</Option> : '' }
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(FreightFormRollback)
