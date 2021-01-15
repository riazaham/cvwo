import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isUserLoggedIn: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/sessions'

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
                return response.text();
            } else {
                throw new Error("Network response not ok");
            }
        })
        .then(response => {
            console.log(response);
            this.props.history.push("/");
        }).catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState = {
            [event.target.name]: event.target.value
        };
    }

    getIsUserLoggedIn() {
        const url = '/userLoggedIn';

        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok");
            }
        }).then(response => {
            console.log(response)
            this.setState({
                isUserLoggedIn: response
            });
        }).catch(() => this.props.history.push('/'));
    }

    render() {
        if (this.state.isUserLoggedIn) {
            return(
                <div>
                    <h1>Welcome back, {this.state.name}</h1>
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
                        <button type='submit'>Login</button>
                        <Link to='/signup'>Register</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Welcome