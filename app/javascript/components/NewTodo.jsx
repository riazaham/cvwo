import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types'; 
import './stylesheets/NewTodo.css'
import "react-datepicker/dist/react-datepicker.css";

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
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onDateChange(date) {
        this.setState({
            deadline: date
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
                <div className='title-card container' style={{textAlign:"center"}}>
                    Add a new todo
                </div>
                <form onSubmit={this.onSubmit}>
                    <br/>
                    <div className='card container'>
                        <label>Name</label>
                        <br/>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <br/>
                    <div className='card container'>
                        <label>Description</label>
                        <br/>
                        <textarea
                            name='body'
                            id='body'
                            rows="3"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <br/>
                    <div className='card container'>
                        <label>Deadline</label>
                        <br/>
                        <DatePicker
                            name='deadline'
                            id='deadline'
                            autoComplete='off'
                            dateFormat="dd MMMM yyyy"
                            selected={this.state.deadline}
                            onChange={this.onDateChange}
                        />
                    </div>
                    <br/>
                    <div className='card container'>
                        <label>Progress</label>
                        <br/>
                        <input
                            type='text'
                            name='progress'
                            id='progress'
                            onChange={this.onChange}
                        />
                    </div>
                    <br/>
                    <div className='button-flex-row'>
                        <div className='button-link-design'>
                            <button type="submit">
                                +
                            </button>
                        </div>
                        <div className='centering-div'>
                            <Link to={`/`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <div className='button-link-design' style={{backgroundColor:'#2a9d8f'}}>
                                    H
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

export default NewTodo