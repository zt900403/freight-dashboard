import React from 'react'
import {Tabs, message} from 'antd';
import UndoneFreightForm from './UndoneFreightForm'
import DoneFreightForm from './DoneFreightForm'
import {getAllRecord} from '../../../../../fetch/FreightRecord'
const TabPane = Tabs.TabPane;

class FreightFormManager extends React.PureComponent {
    state = {
        done: [],
        undone: [],
        loading: false,
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

    render() {
        return (

            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成货运单" key="1"><DoneFreightForm
                    loading={this.state.loading} data={this.state.done}
                    userinfo={this.props.userinfo}/></TabPane>
                <TabPane tab="未完成货运单" key="2"><UndoneFreightForm
                    loading={this.state.loading} data={this.state.undone} userinfo={this.props.userinfo}
                    updateUndoneFormData={this.updateUndoneFormDataHandle}/></TabPane>
            </Tabs>

        )
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        getAllRecord()
            .then((data) => {
                this.setState({
                    done: data.done,
                    undone: data.undone,
                })
            }).catch((err) => {
            message.error(err.message)
        }).finally(() => {
            this.setState({
                loading: false,
            })
        })
    }

}

export default FreightFormManager