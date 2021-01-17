import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/categoryHome.css';

class CategoryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            user: '',
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
                    categories: response.categories,
                    user: response.user
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
            <div>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>{ this.state.user.email }</p>
                </div>
                <div className='top-button-flex-row'>
                    <div style={{margin:'0 auto'}}>
                        <Link to={`/categories/new`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
                            <div className='button-link-design'>
                                +
                            </div>
                        </Link>
                    </div>
                </div>
                <br/>
                <div className='title-card container'>
                    Categories
                </div>
                <div className='category-grid-container'>
                    {data.map((category) => (
                        <div className='category-grid-item' key={category.id}>
                            <Link to={`/categories/${category.id}/todos`} style={{ textDecoration:'none', display:'inline-block' }}>
                                <br />
                                <div className='category-card'>
                                    { category.name }
                                    <div className='flex-row'>
                                        <Link to={`/categories/${category.id}/edit`} style={{ textDecoration:'none', display:'inline-block' }}>
                                            <div className='button-link-design' style={{backgroundColor:'#2a9d8f', fontSize:'16px'}}>
                                                Edits
                                            </div>
                                        </Link>                                
                                        <button onClick={() => this.deleteCategory(category.id)} style={{ textDecoration: 'none' }}>
                                            <div className='button-link-design'>
                                                -
                                            </div>
                                        </button>      
                                    </div>                            
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default CategoryHome