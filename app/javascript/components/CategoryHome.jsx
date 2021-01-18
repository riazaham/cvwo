import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/categoryHome.css';

class CategoryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            categories: [],
            searchWord: ''
        };

        this.deleteCategory = this.deleteCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.logout = this.logout.bind(this);

        this.setSearchState = this.setSearchState.bind(this);
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
                    user: response.user,
                    categories: response.categories
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
                this.getCategories();
            } else {
                throw new Error("Network response was not ok.");
            }
        }).catch(error => console.log(error.message));
    }

    logout() {
        const url = `/sessions/${this.state.user.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: 'DELETE',
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                this.props.history.push('/');
            } else {
                throw new Error("Network response was not ok.");
            }
        }).catch(error => console.log(error.message));
    }

    setSearchState(e) {
        this.setState({
            searchWord: e.target.value
        });
    }

    render() {
        const data = [].concat(this.state.categories);
        
        return(
            <div>
                <div className='header'>
                    <h1>
                        My Todos
                    </h1>
                    <p>{ this.state.user.username }</p>
                    <div className='logout-button' onClick={this.logout}>
                        Logout
                    </div>
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
                    <div style={{display:'flex', alignItems:'center'}}>
                        Categories
                        <div style={{display:'flex', marginLeft:'auto', width:'fit-content', height:'20px', alignItems:'center', gap:'10px'}}>
                            <label>Search:</label>
                            <input
                                type='text'
                                onChange={this.setSearchState}
                            />
                        </div>
                    </div>
                </div>
                <div className='category-grid-container'>
                    {data.filter((category) => category.name.includes(this.state.searchWord)).map((category) => (
                        <div className='category-grid-item' key={category.id}>
                            <Link to={`/categories/${category.id}/todos`} style={{ textDecoration: 'none', display:'inline-block' }}>
                                <br />
                                <span className='category-card'>
                                    { category.name }                          
                                </span>
                            </Link>
                            <span className='category-flex-row'>
                                <button onClick={() => this.deleteCategory(category.id)} style={{ textDecoration: 'none' }}>
                                    <span className='button-link-design' style={{display:'block'}}>
                                        -
                                    </span>
                                </button>  
                                <Link to={`/categories/${category.id}/edit`} style={{ textDecoration:'none', display:'inline-block' }}>
                                    <span className='button-link-design' style={{display:'block', backgroundColor:'#2a9d8f', fontSize:'16px'}}>
                                        Edit
                                    </span>
                                </Link>                                    
                            </span> 
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default CategoryHome