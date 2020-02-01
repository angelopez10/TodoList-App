import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks:[],
            counter: 0
        }
    }

    addTask = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            this.setState({
                tasks: this.state.tasks.concat(e.target.value),
                counter: this.state.counter + 1
            })
            e.target.value='';
        }
    }

    deleteTask = (e) => {
        let newState = Object.assign({}, this.state);
        newState.tasks.splice(e, 1)
        
        this.setState({newState,
        counter: this.state.counter -1
        })
    }

    render() {
        return (
            <div id='mainDiv'>
                <h1>TODOS</h1>
                <ul className='content'>
                <input className='content' name= 'nowrap' type='text' placeholder='What needs to be done?' onKeyDown={(e) => this.addTask(e)} />
                    {this.state.tasks.map((item,i) => {
                        return <li key={i}>{item}<span onClick={(e) => this.deleteTask(i)}><FontAwesomeIcon icon={faTrash} /></span></li>
                    })}
                <p>{this.state.counter} items left</p>    
                </ul>
            </div>
        );
    }
}
