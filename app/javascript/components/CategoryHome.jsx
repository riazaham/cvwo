import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../assets/stylesheets/Home.css';

class CategoryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
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
                console.log(response)
                this.setState({
                    categories: response
                })
            }).catch(() => this.props.history.push("/"));
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
                        <Link to={`/new`} style={{ textDecoration:'none', color:'white', cursor:'pointer', display:'inline-block' }}>
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
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default CategoryHome