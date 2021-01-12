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
                <div className='centering-div'>
                    <Link to={`/new_todo`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
                        <div className='button-link-design'>
                            +
                        </div>
                    </Link>
                </div>
                <br/>
                <div className='title-card container'>
                    Title
                </div>
                {this.state.todos.map((todo) => (
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
        );
    };
}

export default Home