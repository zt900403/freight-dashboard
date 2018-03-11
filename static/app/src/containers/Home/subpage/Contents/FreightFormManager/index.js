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
    }

    updateUndoneFormDataHandle = (data) => {

        let undone = []
        this.state.undone.forEach((item) => {
            if (item.id != data.id)
                undone.push(item)
        })
        this.setState( {
            done: this.state.done.slice().concat([data]),
            undone: undone
        })
    }

    render() {
        return (

            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成货运单" key="1"><DoneFreightForm data={this.state.done} userinfo={this.props.userinfo}/></TabPane>
                <TabPane tab="未完成货运单" key="2"><UndoneFreightForm
                    data={this.state.undone} userinfo = {this.props.userinfo}
                    updateUndoneFormData={this.updateUndoneFormDataHandle}/></TabPane>
            </Tabs>

        )
    }

    componentDidMount() {
        getAllRecord()
            .then((data) => {
                this.setState({
                    done: data.done,
                    undone: data.undone,
                })
            }).catch((err) => {
            message.error(err.message)
        })
    }

}

export default FreightFormManager