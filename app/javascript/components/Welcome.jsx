import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/welcome.css'

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
        return(
            <div className='welcome-card'>
                <h1>MyTodos Login</h1>
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
                        <div className='welcome-flex-button-row'>
                            <button onClick={this.onSubmit} style={{ textDecoration: 'none' }}>
                                <div className='welcome-button-link-design'>
                                    Login
                                </div>
                            </button> 
                            <Link to={`/signup`} style={{ textDecoration:'none' }}>
                                <div className='welcome-button-link-design' style={{backgroundColor:'#2a9d8f', fontSize:'14px'}}>
                                    Register
                                </div>
                            </Link>                                  
                        </div>    
                    </form>
                </div>
            </div>
        );
    }
}

export default Welcome