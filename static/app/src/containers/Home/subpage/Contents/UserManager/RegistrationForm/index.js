/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import {Form, Input, Select, Button } from 'antd';
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
                console.log('Received values of form: ', values);
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
            callback('Two passwords that you enter is inconsistent!');
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
                        rules: [{required: true, message: '请输入用户名!'}],
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
                    label="用户组[多选]"
                >
                    {getFieldDecorator('usergroup', {
                        rules: [
                            { required: true, message: '请选择用户组!', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple">
                            <Option value="default">default</Option>
                            <Option value="group1">group1</Option>
                            <Option value="group2">group2</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: false}],
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
