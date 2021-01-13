import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            sortOrder: 'progressUp'
        };

        this.onSortOrderChange = this.onSortOrderChange.bind(this);
        this.changeSortOrder = this.changeSortOrder.bind(this);
        this.sortByProgressAscending = this.sortByProgressAscending.bind(this);
        this.sortByProgressDescending = this.sortByProgressDescending.bind(this);
    }

    componentDidMount() {
        const url = "api/v1/todos/index";
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
                    todos: response
                })
            }).catch(() => this.props.history.push("/"));
    }

    onSortOrderChange(e) {
        this.setState({
            sortOrder: e.target.value
        })
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

    changeSortOrder() {
        switch (this.state.sortOrder) {
            case 'Progress up':
                this.sortByProgressAscending();
                break
            case 'Progress down':
                this.sortByProgressDescending();
                break
        }
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
                    <div style={{marginLeft:'380px'}}>
                        <Link to={`/new_todo`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
                            <div className='button-link-design'>
                                +
                            </div>
                        </Link>
                    </div>
                    <div className='sort-button-flex-row'>
                        <label>Sort by:</label>
                        <select name="sort-by" id="sort-by" onChange={this.onSortOrderChange}>
                            <option value="Progress up">Progress Up</option>
                            <option value="Progress down">Progress Down</option>
                            <option value="Progress down">Created first</option>
                            <option value="Progress down">Created last</option>
                        </select>
                        <button type="button" onClick={this.changeSortOrder}>
                            <div className='button-link-design' style={{fontSize:'16px', backgroundColor:'#2a9d8f'}}>
                                Sort
                            </div>
                        </button>
                    </div>
                </div>
                <br/>
                <div className='title-card container'>
                    Title
                </div>
                <div>
                    {data.map((todo) => (
                        <div className='centering-div' key={todo.id}>
                            <Link to={`/todos/${todo.id}`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <br />
                                <div className='card'>
                                    { todo.name }
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default Home