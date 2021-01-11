import React from "react";
import './stylesheets/Todo.css'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ''
        };
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
            </div>
        );
    };

}

export default Todo