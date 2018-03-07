/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'
import {Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item
const Option = Select.Option

class NewGroupForm extends React.PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
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
                        <span>用户组名称&nbsp;</span>
                    )}
                >
                    {getFieldDecorator('groupName', {
                        rules: [{required: true, message: '请输入用户组中文名称!'}],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>用户组英文名称&nbsp;</span>
                    )}
                >
                    {getFieldDecorator('groupName2', {
                        rules: [{required: true, message: '请输入用户组英文名称!'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="权限[多选]"
                >
                    {getFieldDecorator('usergroup', {
                        rules: [
                            { required: true, message: '请选择该用户组权限!', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple">
                            <Option value="admin">管理员权限</Option>
                            <Option value="step1">流程一权限</Option>
                            <Option value="step2">流程二权限</Option>
                            <Option value="step3">流程三权限</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认新建</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(NewGroupForm);
