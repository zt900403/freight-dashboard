import React from 'react'
import {Tabs, message} from 'antd';
import UndoneFreightForm from './UndoneFreightForm'
import DoneFreightForm from './DoneFreightForm'

import {getDoneRecord, getUndoneRecord} from '../../../../../fetch/FreightRecord'
const TabPane = Tabs.TabPane;

class FreightFormManager extends React.PureComponent {
    state = {
        done: [],
        donePagination: {},
        undone: [],
        doneLoading: false,
        undoneLoading: false,
    }

    updateUndoneFormDataHandle = (data) => {

        let undone = []
        let done = []
        data.forEach((item) => {
            if (item.status === 'DONE') {
                done.push(item)
            } else {
                undone.push(item)
            }
        })

        this.setState({
            done: this.state.done.slice().concat(done),
            undone: undone
        })
    }

    deleteDoneFreightDataHandle = (id) => {
        this.setState({
            done: this.state.done.filter((item) => item.id !== id)
        })
    }

    updateDoneFreightDataHandle = (data) => {
        this.setState({
            done: this.state.done.filter((item) => item.id !== data.id),
            undone: this.state.undone.slice().concat(data)
        })

    }

    render() {
        return (

            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成货运单" key="1"><DoneFreightForm
                    loading={this.state.doneLoading} data={this.state.done}
                    userinfo={this.props.userinfo}
                    updateDoneFreightData={this.updateDoneFreightDataHandle}
                    deleteDoneFreightData={this.deleteDoneFreightDataHandle}
                    getNewData={this.getDoneData}
                    pagination={this.state.donePagination}/></TabPane>
                <TabPane tab="未完成货运单" key="2"><UndoneFreightForm
                    loading={this.state.undoneLoading} data={this.state.undone} userinfo={this.props.userinfo}
                    updateUndoneFormData={this.updateUndoneFormDataHandle}/></TabPane>
            </Tabs>

        )
    }

    getDoneData = (pagination) => {
        const pagination_tmp = {...pagination}
        const page = pagination ? pagination_tmp.current : 1
        this.setState({
            doneLoading: true,
        })

        getDoneRecord({
            results: 10,
            page: page,
        }).then((result) => {
            pagination_tmp.total = result.total
            this.setState({
                done: result.data,
                donePagination: pagination_tmp,
            })
        }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.setState({
                doneLoading: false,
            })
        })
    }


    getUndoneData = () => {
        this.setState({
            undoneLoading: true,
        })

        getUndoneRecord()
            .then((data) => {
                this.setState({
                    undone: data,
                })
            }).catch((err) => {
            message.error(err.message)
        }).then(() => {
            this.setState({
                undoneLoading: false,
            })
        })
    }

    componentDidMount() {
        this.getDoneData()
        this.getUndoneData()
    }

}

export default FreightFormManager