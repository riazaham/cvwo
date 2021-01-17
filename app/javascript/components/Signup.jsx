import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/users'
        const url2= '/get_all_users'

        const {username, email, password, confirm_password} = this.state;

        const data = {
            username, email, password, confirm_password
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
            console.log(response);
            if (response.ok) {
                return response;
            } else {
                throw new Error("Network response not ok");
            }
        }).catch(error => console.log(error.message));
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                                name='username'
                                id='username'
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
                                required
                                onChange={this.onChange}
                            />
                        </div>
                        <div>
                            <label>Confirm password:</label>
                            <input 
                                type='password'
                                name='confirm_password'
                                id='confirm_password'
                                required
                                onChange={this.onChange}
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