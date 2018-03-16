import React from 'react'
import {Form, Select, Input} from 'antd';
const Option = Select.Option
const FormItem = Form.Item

class EditUserForm extends React.PureComponent {


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
                    {...formItemLayout}
                    label={(
                        <span>姓名&nbsp;</span>
                    )}
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入中文名!'}],
                        initialValue: data.name,
                    })(
                        <Input />
                    )}
                </FormItem>

                { this.props.showAuthority ?
                    <FormItem
                        {...formItemLayout}
                        label="用户权限[多选]"
                    >
                        {getFieldDecorator('authority', {
                            rules: [
                                {required: true, message: '请选择用户权限!', type: 'array'},
                            ],
                            initialValue: data.authority,
                        })(
                            <Select mode="multiple">
                                <Option value="ADMIN">管理员</Option>
                                <Option value="STEP1">流程一</Option>
                                <Option value="STEP2">流程二</Option>
                                <Option value="STEP3">流程三</Option>
                                <Option value="STEP4">流程四</Option>
                            </Select>
                        )}
                    </FormItem>
                    : ''
                }
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            min: 6, message: '长度小于6!'
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: false,
                            pattern: /[0-9]{11}/, message: '请输入11位手机号!'
                        }],
                        initialValue: data.phone,
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(EditUserForm)
