import React from 'react'
import {Table, Button, Modal} from 'antd';
class DoneFreightForm extends React.PureComponent {

    render() {
        const columns = [{
            title: '单号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '动作',
            key: 'action',
            render: (text, record) => {
                return <Button type="primary">明细</Button >
            }
        }];

        return (
            <div>
                <Table columns={columns} dataSource={this.props.data}/>
                <Modal
                    cancelText="关闭"
                    title="货运单详情"
                >
                    
                </Modal>
            </div>
        )

    }
}

export default DoneFreightForm