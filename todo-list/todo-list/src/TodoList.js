import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            counter: 0
        }
    }
    componentDidMount(){
        this.getUser()
    }

    getUser(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (resp.ok === true) {
                    this.getTodos()
                } else {
                    this.createUser()
                }
            })
            .then(data => {
               
                console.log(data.label)
            })
            .catch(error => {
                console.log(error);
            });
    }
    createUser() {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getTodos(){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                    return resp.json()
            })
            .then(data => {
                this.setState({
                    tasks: data,
                    counter: data.length 
                })
                console.log(data.label)
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    addTask = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            let newState = Object.assign({}, this.state);
            newState.tasks.push({label:e.target.value, done: false});
            console.log(newState.tasks)
            fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
                method: "PUT",
                body: JSON.stringify( newState.tasks.map((item => item))),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    console.log(data); 
                    this.getTodos()
                })
                .catch(error => {
                    console.log(error);
                });
            e.target.value = '';
        }
    }
    deleteTask = (e) => {
        let newState = Object.assign({}, this.state);
        newState.tasks.splice(e, 1)
        fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
                method: "PUT",
                body: JSON.stringify( newState.tasks.map((item => item))),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json(); 
                })
                .then(data => {
                    console.log(data); 
                    this.getTodos()
                })
                .catch(error => {
                    console.log(error);
                });
        
    }

    deleteAllTasks = (e) => {
        let newState = Object.assign({}, this.state);
        newState.tasks.splice(0, newState.tasks.length)
        fetch('https://assets.breatheco.de/apis/fake/todos/user/angelopez10', {
            method: "PUT",
            body: JSON.stringify([{'label': 'no hay tareas', 'done': false}]),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json(); 
            })
            .then(data => {
                console.log(data);
                this.getTodos()
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div id='mainDiv'>
                <h1>TODOS</h1>
                <ul className='content'>
                    <input className='content' name='nowrap' type='text' placeholder='What needs to be done?' onKeyDown={(e) => this.addTask(e)} />
                    {this.state.tasks.map((item, i) => {
                        return <li key={i}>{item.label}<span className='delIcon' onClick={(e) => this.deleteTask(i)}><FontAwesomeIcon icon={faTrash} /></span></li>
                    })}
                    <p>{this.state.counter} items left<span className='delAll' onClick={(e) => this.deleteAllTasks(e)}>Clear All</span></p> 
                </ul>
            </div>
        );
    }
}