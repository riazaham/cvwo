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

    sortByProgressAscending(data) {
        this.setState({
            todos: data.sort((a, b) => a.progress > b.progress ? 1 : -1)
        })
    }

    sortByProgressDescending(data) {
        this.setState({
            todos: data.sort((a, b) => a.progress > b.progress ? -1 : 1)
        })
    }

    changeSortOrder(sortOrderInput) {
        this.setState({
            sortOrder: sortOrderInput
        })
        switch (this.state.sortOrder) {
            case 'progressUp':
                this.sortByProgressAscending(this.state.todos);
                break
            case 'progressDown':
                this.sortByProgressDescending(this.state.todos);
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
                        <select name="sort-by" id="sort-by">
                            <option value="progress up">Progress Up</option>
                            <option value="progress down">Progress Down</option>
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
                    {data
                    .sort((a, b) => a.progress > b.progress ? -1 : 1)
                    .map((todo) => (
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