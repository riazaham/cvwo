import React from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/Todo.css';
import '../../assets/stylesheets/circularProgressbar.css';
import Moment from 'moment';
import { CircularProgressbar } from 'react-circular-progressbar';


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
            todo: ''
        };
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { category_id, id  }
            }
        } = this.props;

        const url = `/api/v1/categories/${category_id}/todos/${id}`;

        fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ 
            category_id: category_id,
            todo: response 
        }))
        .catch(() => this.props.history.push(`/categories/${category_id}/todos`));
    }

    deleteTodo() {
        const {
            match: {
                params: { category_id, id }
            }
        } = this.props;
        const url = `/api/v1/categories/${category_id}/todos/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: 'DELETE',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok.");
            }
        }).then(() => this.props.history.push(`/categories/${category_id}/todos`))
        .catch(error => console.log(error.message));
    }

    render() {
        return(
            <div className='todo'>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>Profile</p>
                </div>
                <div className='todo-flex-row'>
                    <div className='todo-flex-column-1'>
                        <div className='todo-flex-item'>
                            { this.state.todo.name }
                        </div>
                        <div className='todo-flex-item'style={{flexGrow:2}}>
                            <b>Description:</b>
                            <p>{ this.state.todo.body }</p>
                        </div>
                    </div>
                    <div className='todo-flex-column-2'>
                        <div className='todo-flex-item' style={{flexGrow:2}}>
                            <b>Deadline:</b>
                            <p>{ Moment(this.state.todo.deadline).format("DD MMMM yyyy") }</p>
                        </div>
                        <div className='todo-flex-item' style={{flexGrow:2}}>
                            <b>Progress:</b>
                            <p style={{textAlign:'center'}}><CircularProgressbar value={this.state.todo.progress} text={`${this.state.todo.progress}%`} /></p>  
                        </div>
                    </div>
                </div>
                <br/>
                <div className='button-flex-row'>
                    <div className='centering-div'>
                        <button onClick={this.deleteTodo} style={{ textDecoration: 'none' }}>
                            <div className='button-link-design'>
                                -
                            </div>
                        </button>
                    </div>
                    <div className='centering-div'>
                        <Link to={`/categories/${this.state.category_id}/todos/${this.state.todo.id}/edit`} style={{ textDecoration:'none', display:'inline-block' }}>
                            <div className='button-link-design' style={{backgroundColor:'#2a9d8f', fontSize:'16px'}}>
                                Edit
                            </div>
                        </Link>
                    </div>
                    <div className='centering-div'>
                        <Link to={`/categories/${this.state.category_id}/todos`} style={{ textDecoration:'none', display:'inline-block' }}>
                            <div className='button-link-design' style={{backgroundColor:'#2a9d8f',fontSize:'16px'}}>
                                Home
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

}

export default Todo