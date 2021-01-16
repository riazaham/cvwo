import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/sessions'

        const {username, password} = this.state;

        const data = {
            username, password
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
        }).then(response => {
            if (response.message === 'User authentication failed') {
                console.log('User authentication failed, please try again...')
            } else {
                this.props.history.push("/categories")
            }
        }).catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.user) {
            return(
                <div>
                    <h1>Welcome back, {this.state.username}</h1>
                </div>
            );
        }
        return(
            <div>
                <h1>Welcome</h1>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                required
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                                type='password'
                                name='password'
                                id='password'
                                required
                                onChange={this.onChange}
                            />
                        </div>
                        <button type='submit'>Login</button>
                        <Link to='/signup'>Register</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Welcome