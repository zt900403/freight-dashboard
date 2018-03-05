import React from 'react'

class App extends React.PureComponent {
    constructor(props, context){
        super(props, context)
        // this.state = {
        //     initDone: false
        // }
    }
    render(){
        return(
            <div>
                {/*{*/}
                    {/*this.state.initDone*/}
                        {/*? this.props.children*/}
                        {/*:<div> Loading </div>*/}
                {/*}*/}
                {this.props.children}
            </div>
        )
    }
    componentDidMount(){
        /*
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null){
            cityName = '北京'
        }
        this.props.userInfoActions.update({
            cityName:cityName
        })

        //
        this.setState({initDone:true})
        */
    }
}

export default App