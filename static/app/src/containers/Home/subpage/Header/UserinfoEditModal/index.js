/**
 * Created by ZT on 18/03/06.
 */
import React from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd';
import FreightFormManager  from '../../../../../controllers/FreightFormStep1'
const FormItem = Form.Item;
const UserinfoEditModal = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                width={1000}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Title">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title of collection!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item">
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="public">Public</Radio>
                                <Radio value="private">Private</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>

                <FreightFormManager/>
            </Modal>
        );
    }
);

export default UserinfoEditModal