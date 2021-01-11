import React, { Component } from "react";
import { Link } from "react-router-dom";

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            body: "",
            deadline: "",
            progress: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/todos/create";
        const {name, body, deadline, progress} = this.state

        const data = {
            name, body, deadline, progress
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response not ok");
            }
        })
        .then(response => {
            this.props.history.push(`/todos/${response.id}`)
        }).catch(error => console.log(error.message));
    }

    render() {
        return(
            <div>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>Profile</p>
                </div>
                <h2>Add a new Todo</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name='body'
                            id='body'
                            rows="3"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Deadline</label>
                        <input
                            type='text'
                            name='deadline'
                            id='deadline'
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Progress</label>
                        <input
                            type='text'
                            name='progress'
                            id='progress'
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit">Add Todo</button>
                    <Link to='/'>Home</Link>
                </form>
            </div>
        );
    };
}

export default NewTodo