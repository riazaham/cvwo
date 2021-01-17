import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const url = '/users/sign_in';
        const url2 = '/is_user_signed_in';

        const {email, password} = this.state;

        const data = {
            email, password
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
                this.props.history.push("/categories")
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
                        <button type='submit'>Login</button>
                        <Link to='/signup'>Register</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Welcome