import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import '../../assets/stylesheets/NewTodo.css'
import '../../assets/stylesheets/inputRange.css'
import "react-datepicker/dist/react-datepicker.css";
import InputRange from 'react-input-range';

class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            body: "",
            deadline: "",
            progress: 0,
        };

        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onProgressChange = this.onProgressChange.bind(this);
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

    onProgressChange(value) {
        this.setState({
            progress: value
        });
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/todos/${id}`;

        fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ 
            name: response.name,
            body: response.body,
            deadline: new Date(response.deadline),
            progress: response.progress
        }))
        .catch(() => this.props.history.push("/todos"));
    }

    onSubmit(event) {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/todos/${id}`;
        
        event.preventDefault();
        const {name, body, deadline, progress} = this.state

        const data = {
            name, body, deadline, progress
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: 'PATCH',
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
                    Edit todo
                </div>
                <form onSubmit={this.onSubmit}>
                    <br/>
                    <div className='card container'>
                        <label>Name</label>
                        <br/>
                        <input
                            value={this.state.name}
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
                            value={this.state.body}
                            name='body'
                            id='body'
                            rows="3"
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
                        <br/><br/><br/>
                        <InputRange
                            name='progress'
                            id='progress'
                            minValue={0}
                            maxValue={100}
                            value={this.state.progress}
                            onChange={this.onProgressChange}
                        />
                        <br/>
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

export default EditTodo