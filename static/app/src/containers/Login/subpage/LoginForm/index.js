/**
 * Created by zhang on 18/03/06.
 */
import React from 'react'


import {Form, Icon, Input, Button, Checkbox} from 'antd'
const FormItem = Form.Item
class LoginForm extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    handleSubmit = () => {
        // console.log("get filed:", this.props.form.getFieldsValue())
        // this.props.history.push('/')
        this.props.onLogin(this.props.form.getFieldsValue());
    }

    check = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors)
                this.handleSubmit()
        });

    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form >
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入你的用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入你的密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a href="">忘记密码</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" loading={this.props.loading} onClick={this.check}>
                        登陆
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(LoginForm)