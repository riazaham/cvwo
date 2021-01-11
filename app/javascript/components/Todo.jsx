import React from "react";
import './stylesheets/Todo.css'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ''
        };
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/show/${id}`;

        fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ 
            todo: response 
        }))
        .catch(() => this.props.history.push("/todos"));
    }

    deleteTodo() {
        const {
            match: {
                params: { id }
            }
        } = this.props;
        const url = `/api/v1/destroy/${id}`;
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
        }).then(() => this.props.history.push('/todos'))
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
                            <p>{ this.state.todo.deadline }</p>
                        </div>
                        <div className='todo-flex-item' style={{flexGrow:2}}>
                            <b>Progress:</b>
                            <p>{ this.state.todo.progress }</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{width:'100%', margin:'0 auto'}}>
                    <button onClick={this.deleteTodo} style={{ textDecoration: 'none' }}>
                        <div className='new-todo-link'>
                            -
                        </div>
                    </button>
                </div>
            </div>
        );
    };

}

export default Todo