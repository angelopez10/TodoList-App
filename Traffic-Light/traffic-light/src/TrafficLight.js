import React from 'react'

class TrafficLight extends React.Component{
    
    constructor() {
        super();
        this.state = {
            selected: null
        };
    }
    
render(){
    let redGlow = '';
    if(this.state.selected === 'red') redGlow = 'selected';
    let yellowGlow = '';
    if(this.state.selected === 'yellow') yellowGlow = 'selected';
    let greenGlow = '';
    if(this.state.selected === 'green') greenGlow = 'selected';
    

        return <div>
            <div id='hanger'></div>
            <div id='trafficBody'>
                <div className={'red light '+ redGlow} onMouseOver={() => this.setState({selected: 'red'})}></div>
                <div className={'yellow light '+ yellowGlow} onMouseOver={() => this.setState({selected: 'yellow'})}></div>
                <div className={'green light '+ greenGlow} onMouseOver={() => this.setState({selected: 'green'})}></div>
            </div>
        </div>
   }
}

export default TrafficLight