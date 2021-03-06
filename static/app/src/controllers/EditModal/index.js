/**
 * Created by ZT on 18/03/06.
 */
import React from 'react'
import { Modal, Form, } from 'antd';

const Step2Modal = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, confirmLoading } = props;
        return (
            <Modal
                visible={visible}
                title="货运单信息"
                okText="确认"
                cancelText="取消"
                width={1000}
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={confirmLoading}
            >
                {props.children}
            </Modal>
        );
    }
);

export default Step2Modal