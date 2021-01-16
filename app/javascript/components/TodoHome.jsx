import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/todoHome.css';

class TodoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            category_id: '',
            sortOrder: ''
        };

        this.onSortOrderChange = this.onSortOrderChange.bind(this);
        this.changeSortOrder = this.changeSortOrder.bind(this);
        this.sortByProgressAscending = this.sortByProgressAscending.bind(this);
        this.sortByProgressDescending = this.sortByProgressDescending.bind(this);
        this.sortByCreatedFirst = this.sortByCreatedFirst.bind(this);
        this.sortByCreatedLast = this.sortByCreatedLast.bind(this);
        this.sortByDeadlineAscending = this.sortByDeadlineAscending.bind(this);
        this.sortByDeadlineDescending = this.sortByDeadlineDescending.bind(this);
    }

    componentDidMount() {
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

    changeSortOrder() {
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
                    <div style={{marginLeft:'400px'}}>
                        <Link to={`/categories/${this.state.category_id}/todos/new`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
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
                            <option value="Created first">Created first</option>
                            <option value="Created last">Created last</option>
                            <option value="Deadline up">Deadline up</option>
                            <option value="Deadline down">Deadline down</option>
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
                            <Link to={`/categories/${this.state.category_id}/todos/${todo.id}`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <br />
                                <div className='card'>
                                    { todo.name }
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='centering-div'>
                    <Link to={`/categories`} style={{ textDecoration:'none', display:'inline-block' }}>
                        <div className='button-link-design' style={{backgroundColor:'#2a9d8f',fontSize:'16px'}}>
                            Home
                        </div>
                    </Link>
                </div>
            </div>
        );
    };
}

export default TodoHome