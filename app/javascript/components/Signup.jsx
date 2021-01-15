import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/users'

        const {name, password} = this.state;

        const data = {
            name, password
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
            this.props.history.push("/")
        }).catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState = {
            [event.target.name]: event.target.value
        };
    }

    render() {
        return(
            <div>
                <h1>Welcome</h1>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                                type='password'
                                name='password'
                                id='password'
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup