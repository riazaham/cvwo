import React, { Component } from "react";
import { Link } from "react-router-dom";
import './stylesheets/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
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

    render() {
        return(
            <div className='home'>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>Profile</p>
                </div>
                <Link to={`/new_todo`} style={{ textDecoration: 'none' }}>
                    <div className='button-link-design'>
                        +
                    </div>
                </Link>
                <br/>
                <div className='title-card container'>
                    Title
                </div>
                <div>
                    {this.state.todos.map((todo) => (
                        <Link to={`/todos/${todo.id}`} style={{ textDecoration: 'none' }} key={todo.id}>
                            <br />
                            <div className='card container'>
                                { todo.name }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };
}

export default Home