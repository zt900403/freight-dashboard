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
        // let done = []
        data.forEach((item) => {
            if (item.status === 'DONE' || item.status === 'STEP4') {
                // done.push(item)
            } else {
                undone.push(item)
            }
        })
        this.setState({
            undone,
        })
        // this.state.donePagination.total = done.length
        // this.setState({
        //     done: this.state.done.slice().concat(done),
        //     undone: undone,
        //     donePagination: {...this.state.donePagination},
        // })
        this.updateDoneData()
    }

    deleteDoneFreightDataHandle = (id) => {
        // const done =  this.state.done.filter((item) => item.id !== id)
        // this.state.donePagination.total = done.length
        // this.setState({
        //     done,
        //     donePagination: {...this.state.donePagination}
        // })
        this.updateDoneData()
    }

    deleteUndoneFreightDataHandle = (id) => {
        this.setState({
            undone: this.state.undone.filter((item) => { return id !== item.id})
        })
    }
    updateDoneData = () => {
        if (this.state.done.length === 1) {
            if (this.state.donePagination.current > 1) {
                let tmp = {...this.state.donePagination}
                tmp.current--
                this.getDoneData(tmp)
            } else {
                this.setState({
                    done: [],
                })
            }
        } else {
            this.getDoneData(this.state.donePagination)
        }
    }

    updateDoneFreightDataHandle = (data) => {
        // const done = this.state.done.filter((item) => item.id !== data.id)
        // this.state.donePagination.total = done.length
        // this.setState({
        //     done,
        //     undone: this.state.undone.slice().concat(data),
        //     donePagination: {...this.state.donePagination},
        // // })
        // if (this.state.done.length === 1) {
        //     if
        //         }
        this.setState({
            undone: this.state.undone.slice().concat(data),
        })

        this.updateDoneData()

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
                    updateUndoneFormData={this.updateUndoneFormDataHandle}
                    deleteUndoneFreightData={this.deleteUndoneFreightDataHandle}
                /></TabPane>
            </Tabs>

        )
    }

    getDoneData = (pagination, conditions) => {
        const pagination_tmp = {...pagination}
        const page = pagination ? pagination_tmp.current || 1 : 1

        this.setState({
            doneLoading: true,
        })

        getDoneRecord(Object.assign({
            results: 10,
            page: page,
        }, conditions)).then((result) => {
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