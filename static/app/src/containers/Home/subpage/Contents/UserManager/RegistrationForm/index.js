/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import {Form, Input, Select, Button, InputNumber } from 'antd';
const FormItem = Form.Item
const Option = Select.Option

class RegistrationForm extends React.PureComponent {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.onRegister(values)
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {
                    span: 4,
                    offset: 4,
                },
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (

            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>姓名&nbsp;</span>
                    )}
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入中文名!'}],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>用户名&nbsp;</span>
                    )}
                >
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名!'},{
                                min: 6, message:'长度小于6!'
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请输入确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户权限[多选]"
                >
                    {getFieldDecorator('authority', {
                        rules: [
                            { required: true, message: '请选择用户权限!', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple">
                            <Option value="ADMIN">管理员</Option>
                            <Option value="STEP1">流程一</Option>
                            <Option value="STEP2">流程二</Option>
                            <Option value="STEP3">流程三</Option>
                            <Option value="STEP4">流程三</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: false,
                                pattern: /[0-9]{11}/, message:'请输入11位手机号!'}],
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认新建</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegistrationForm);
