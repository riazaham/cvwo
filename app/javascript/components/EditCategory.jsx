import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/NewTodo.css'
import '../../assets/stylesheets/inputRange.css'
import "react-datepicker/dist/react-datepicker.css";

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            todo_count: 0,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/categories/${id}`;

        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ 
            name: response.name,
            todo_count: response.todo_count
        }))
        .catch(() => this.props.history.push("/"));
    }

    onSubmit(event) {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/categories/${id}`;

        event.preventDefault();
        const {name, todo_count} = this.state;

        const data = {
            name, todo_count
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
        .then(() => this.props.history.push('/'))
        .catch(error => console.log(error.message));
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
                    Edit category
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
                    <div className='button-flex-row'>
                        <div className='button-link-design'>
                            <button type="submit">
                                +
                            </button>
                        </div>
                        <div className='centering-div'>
                            <Link to={`/categories`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <div className='button-link-design' style={{backgroundColor:'#2a9d8f', fontSize:'14px'}}>
                                    Home
                                </div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

export default EditCategory