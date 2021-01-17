import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/signup.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/users'

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
        })
        .then(response => {
            this.props.history.push("/")
        }).catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <div className='signup-card'>
                <h1>MyTodos Register</h1>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                maxLength='16'
                                required
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type='text'
                                name='email'
                                id='email'
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
                                minLength='6'
                                required
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='signup-flex-button-row'>
                            <button type='submit' style={{ textDecoration: 'none' }}>
                                <div className='signup-button-link-design'>
                                    Sign up
                                </div>
                            </button> 
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup