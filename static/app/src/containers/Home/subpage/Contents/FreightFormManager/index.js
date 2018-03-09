import React from 'react'
import {Tabs} from 'antd';
import UndoneFreightForm from './UndoneFreightForm'
import DoneFreightForm from './DoneFreightForm'
import {getAllRecord} from '../../../../../fetch/FreightRecord'
const TabPane = Tabs.TabPane;

class FreightFormManager extends React.PureComponent {
    state = {
        done: [],
        undone: [],
    }

    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成货运单" key="1"><DoneFreightForm data={this.state.done}/></TabPane>
                <TabPane tab="未完成货运单" key="2"><UndoneFreightForm data={this.state.undone}/></TabPane>
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
            })
    }

}

export default FreightFormManager