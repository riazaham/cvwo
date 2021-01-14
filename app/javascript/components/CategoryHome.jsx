import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/Home.css';

class CategoryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            reloadBool: true,
        };

        this.deleteCategory = this.deleteCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        const url = "api/v1/categories";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response not ok");
                }
            })
            .then(response => {
                this.setState({
                    categories: response
                })
            }).catch(() => this.props.history.push("/"));
    }

    deleteCategory(id) {
        const url = `/api/v1/categories/${id}`;
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
        }).then(() => this.getCategories())
        .catch(error => console.log(error.message));
    }

    render() {
        const data = [].concat(this.state.categories);
        
        return(
            <div className='home'>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>Profile</p>
                </div>
                <div className='top-button-flex-row'>
                    <div style={{marginLeft:'380px'}}>
                        <Link to={`/categories/new`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
                            <div className='button-link-design'>
                                +
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className='title-card container'>
                    Title
                </div>
                <div>
                    {data.map((category) => (
                        <div className='centering-div' key={category.id}>
                            <Link to={`/categories/${category.id}/todos`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <br />
                                <div className='card'>
                                    { category.name }
                                </div>
                            </Link>
                            <div className='centering-div'>
                                <Link to={`/categories/${category.id}/edit`} style={{ textDecoration:'none', display:'inline-block' }}>
                                    <div className='button-link-design' style={{backgroundColor:'#2a9d8f', fontSize:'16px'}}>
                                        Edit
                                    </div>
                                </Link>
                            </div>
                            <div className='centering-div'>
                                <button onClick={() => this.deleteCategory(category.id)} style={{ textDecoration: 'none' }}>
                                    <div className='button-link-design'>
                                        -
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default CategoryHome