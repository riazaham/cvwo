import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/todoHome.css';
import Moment from 'moment';
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../assets/stylesheets/circularProgressbar.css';

class TodoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            category_id: '',
            sortOrder: '',
            searchWord: ''
        };

        this.changeSortOrder = this.changeSortOrder.bind(this);
        this.sortByProgressAscending = this.sortByProgressAscending.bind(this);
        this.sortByProgressDescending = this.sortByProgressDescending.bind(this);
        this.sortByCreatedFirst = this.sortByCreatedFirst.bind(this);
        this.sortByCreatedLast = this.sortByCreatedLast.bind(this);
        this.sortByDeadlineAscending = this.sortByDeadlineAscending.bind(this);
        this.sortByDeadlineDescending = this.sortByDeadlineDescending.bind(this);

        this.getTodos = this.getTodos.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.setSearchState = this.setSearchState.bind(this);
    }

    componentDidMount() {
        this.getTodos();
    }

    getTodos() {
        const {
            match: {
                params: { category_id }
            }
        } = this.props;

        const url = `/api/v1/categories/${category_id}/todos`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response not ok");
                }
            })
            .then(response => {
                this.setState({
                    category_id: category_id,
                    todos: response
                })
            }).catch(() => this.props.history.push("/categories"));
    }

    deleteTodo(id) {
        const url = `/api/v1/categories/${this.state.category_id}/todos/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: 'DELETE',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                this.getTodos();
            } else {
                throw new Error("Network response was not ok.");
            }
        }).then(() => this.props.history.push(`/categories/${this.state.category_id}/todos`))
        .catch(error => console.log(error.message));
    }

    sortByProgressAscending() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.progress > b.progress ? 1 : -1)
        })
    }

    sortByProgressDescending() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.progress > b.progress ? -1 : 1)
        })
    }

    sortByCreatedFirst() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
        })
    }

    sortByCreatedLast() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
        })
    }

    sortByDeadlineAscending() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.deadline > b.deadline ? 1 : -1)
        })
    }

    sortByDeadlineDescending() {
        this.setState({
            todos: this.state.todos.sort((a, b) => a.deadline > b.deadline ? -1 : 1)
        })
    }

    changeSortOrder(e) {
        this.setState({
            sortOrder: e.target.value
        })
        switch (this.state.sortOrder) {
            case 'Progress up':
                this.sortByProgressAscending();
                break
            case 'Progress down':
                this.sortByProgressDescending();
                break
            case 'Created first':
                this.sortByCreatedFirst();
                break
            case 'Created last':
                this.sortByCreatedLast();
                break
            case 'Deadline up':
                this.sortByDeadlineAscending();
                break
            case 'Deadline down':
                this.sortByDeadlineDescending();
                break
        }
    }

    setSearchState(e) {
        this.setState({
            searchWord: e.target.value
        });
    }

    render() {
        const data = [].concat(this.state.todos);
        
        return(
            <div className='home'>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>Profile</p>
                </div>
                <div className='top-button-flex-row'>
                    <div style={{marginLeft:'390px'}}>
                        <Link to={`/categories/${this.state.category_id}/todos/new`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
                            <div className='button-link-design'>
                                +
                            </div>
                        </Link>
                    </div>
                    <div className='sort-button-flex-row'>
                        <label>Sort by:</label>
                        <select name="sort-by" id="sort-by" onChange={this.changeSortOrder}>
                            <option value="Progress up">Progress Up</option>
                            <option value="Progress down">Progress Down</option>
                            <option value="Created first">Created first</option>
                            <option value="Created last">Created last</option>
                            <option value="Deadline up">Deadline up</option>
                            <option value="Deadline down">Deadline down</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className='title-card container'>
                    <div style={{display:'flex', alignItems:'center'}}>
                        Title
                        <div style={{display:'flex', marginLeft:'auto', width:'fit-content', height:'20px', alignItems:'center', gap:'10px'}}>
                            <label>Search:</label>
                            <input
                                type='text'
                                onChange={this.setSearchState}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {data.filter((todo) => todo.name.includes(this.state.searchWord)).map((todo) => (
                        <div className='centering-div' key={todo.id}>
                            <Link to={`/categories/${this.state.category_id}/todos/${todo.id}`} style={{textDecoration: 'none'}}>
                                <br />
                                <div className='todo-card'>
                                    { todo.name }
                                    <div style={{display:'flex', alignItems:'center', marginLeft:'auto', gap:'10px'}}>
                                        { todo.deadline ? Moment(todo.deadline).format("DD MMMM yyyy") : '' }
                                        <div style={{width:'25px', height:'25px'}}>
                                            <CircularProgressbar value={todo.progress}/>
                                        </div>
                                        <div onClick={() => this.deleteTodo(todo.id)} className='todo-delete-button'>
                                            -
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='centering-div'>
                    <Link to={`/categories`} style={{ textDecoration:'none', display:'inline-block' }}>
                        <div className='button-link-design' style={{backgroundColor:'#2a9d8f',fontSize:'16px', marginTop:'20px'}}>
                            Home
                        </div>
                    </Link>
                </div>
            </div>
        );
    };
}

export default TodoHome