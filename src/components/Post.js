import React, { Component } from 'react';
import { db } from './firebase/firebase';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import Navbar from './Navbar';
import Footer from './Footer'

import './Post.css';


class Post extends Component {
    state = {
        url: '',
        currentPost: ''
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(id);
        let currentPost = []
      
            db.ref('Items').on('value', (data) => {
                for (var key in data.val()) {
                    if (data.val()[key].id === id) {
                        currentPost.push(data.val()[key])
                    }
                }
            })
    
        setTimeout(() => {
            this.setState({
                currentPost: currentPost[0]
            })
        }, 2000)
    }
    render() {
        let { currentPost } = this.state;

        console.log(currentPost);
        return (
                <div>
                    <Navbar />
                    <div className='postDiv'>
                        <div className='postImage'><img src={currentPost ? currentPost.url : ''} className="img-fluid" width='600' alt="Responsive" /></div>
                        <div className='postSeller'>
                            <h4>Seller Description</h4>
                            <h6 className='postContact'>Contact No:</h6> +92
                            <span>{currentPost ? currentPost.phoneNo : ''}</span>
                            <h6 className='postContact'>Country:</h6>
                            <p>{currentPost ? currentPost.country : ''}</p>
                            <h6 className='postContact'>Address:</h6>
                            <p>{currentPost ? currentPost.adress : ''}</p>
                            <Link to='/'>
                                <button type="button" className="btn btn-primary btn-dark btn-block">Chat With Seller</button>
                            </Link>
                            <div className='postPrice'><h4>Price:</h4><h5>RS {currentPost ? currentPost.price : '0'} </h5></div>
                            <div className='postDetails'><h4>Details:</h4>  <p>{currentPost ? currentPost.condition : ''}</p>  </div>
                        </div>
                    </div>

                    <div className='priceDiv'>
                        <div className='postDes'><h4>Description:</h4>  <p>{currentPost ? currentPost.description : ''}</p> </div>
                    </div>
                    <Footer />
                </div>
               
        )
    }
}

export default withRouter(Post); 