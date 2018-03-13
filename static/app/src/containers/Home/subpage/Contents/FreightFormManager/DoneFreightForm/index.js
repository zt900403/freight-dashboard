import React from 'react'
import {Table, Button, Modal} from 'antd';
import FreightFormDetail from '../../../../../../controllers/FreightFormDetail'
class DoneFreightForm extends React.PureComponent {
    state = {
        detailData: '',
        modalVisible: false,
    }

    showModal = (record) => {
       this.setState({
           detailData: record,
           modalVisible: true,
       })
    }

    handleCancel = () => {
        this.setState({modalVisible: false});
    }

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
                return <Button type="primary" onClick={this.showModal.bind(this, record)}>明细</Button >
            }
        }];

        return (
            <div>
                <Table loading={this.props.loading} columns={columns} dataSource={this.props.data}/>
                <Modal
                    cancelText="关闭"
                    title="货运单详情"
                    visible={this.state.modalVisible}
                    onCancel={this.handleCancel}
                    width={1000}
                    footer={[
                        <Button key="cancel" type="primary" onClick={this.handleCancel}>关闭</Button>
                    ]}
                >
                    <FreightFormDetail data={this.state.detailData}
                        userinfo={this.props.userinfo}/>
                </Modal>
            </div>
        )

    }
}

export default DoneFreightForm