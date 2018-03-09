import React from 'react'
import {Table, Icon, Divider} from 'antd';
class UndoneFreightForm extends React.PureComponent {

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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
      <a href="#">Action 一 {record.name}</a>
    </span>
            ),
        }];


        return (
            <Table columns={columns} dataSource={this.props.data}/>
        )
    }
}

export default UndoneFreightForm