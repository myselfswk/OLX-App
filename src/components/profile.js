import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from './firebase/firebase';

import Footer from './Footer'
import Navbar from './Navbar';

import './profile.css';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            logInUser: {},
            authUser: {},
        }
    }

    onHandleChange = (e) => {
        this.setState({
            ...this.state.logInUser,
            logInUser: {
                ...this.state.logInUser,
                [e.target.name]: e.target.value
            }
        })
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            // if (user) {
                db.ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email === user.email) {
                            this.setState({
                                logInUser: data.val()[key]
                            })
                        }
                    }
                    console.log(this.state.logInUser);
                })
            // }
        })
    }

    saveChanges = () => {
        const { id, username, email, photoURL, phone, about , password} = this.state.logInUser;
        db.ref('users').child(id).set({
            id:id,
            username:username,
            email:email,
            about:about,
            photourl:photoURL,
            phoneNumber:phone,
            password: password,
        })
        .then((response) => {
            alert("Succesfully User Updated.");
            console.log(response);
        })
        .catch((error) => {
            alert(error.message);
        })
        console.log(this.state.logInUser);
    }

    render() {
        const { username, email, phoneNumber, about } = this.state.logInUser;
        console.log(phoneNumber)
        return (
            <>
                <Navbar />
                {
                    this.state.authUser ?
                        <div>
                            <div className={`container`}>
                                <div className={`row`}>

                                    <div className={`col-md-3 edit-profile`}>
                                        <Link to={`/profile`}><h5>Edit Profile</h5></Link>
                                        <Link to={`/profile`}><p>Profile Picture</p></Link>
                                        <button className={`btn btn-block`}>View Profile</button>
                                    </div>

                                    <div className={`col-md-9 profile-box`}>
                                        <div className='edit-profile-H'>
                                            <h3>Edit Profile</h3>
                                        </div>
                                        <div className='basic-info'>
                                            <h4 className={`basic-info-H`}>Basic Information</h4>
                                            <input name="username" type="text" className="basic-info-U" aria-describedby="button-addon2" placeholder={`username`} onChange={(e) => this.onHandleChange(e)} value={username} /><br />
                                            <small>13/30</small><br />
                                            <textarea name="aboutUs" type="text" className='basic-info-T' cols="48" rows="3" aria-describedby="button-addon2" placeholder="About Us (Optional)" onChange={(e) => this.onHandleChange(e)} value={about}></textarea><br />
                                            <small>0/200</small><br />
                                            <div className={`basic-info-important`}>
                                                <div className={`basic-info-important-I`}>
                                                    <i className="far fa-lightbulb-on"></i>
                                                    <p>Why is it important?</p>
                                                </div>
                                                <p>OLX is built on trust. Help other people get to know you. Tell them about the things you like.
                                        Share your favorite brands, books, movies, shows, music, food. And you will see the results…</p>
                                            </div>
                                        </div>

                                        <div className='contact-info'>
                                            <h4 className={`basic-info-C`}>contact Information</h4>
                                            <div className={`info-C`}>
                                                <span>
                                                    <span className="contact">+92</span>
                                                    <input name={`phoneNo`} type="number" className="form-control info-I" onChange={(e) => this.onHandleChange(e)} value={phoneNumber} />
                                                </span>
                                            </div>
                                            <div className={`info-C`}>
                                                <span>
                                                    <input name={`email`} type="email" className="form-control info-I" onChange={(e) => this.onHandleChange(e)} value={email} />
                                                </span>
                                            </div>
                                            <div className={`info-P`}>
                                                <p>This is the number for buyers contacts, reminders, and other notifications.</p>
                                                <p>We won't reveal your email to anyone else nor use it to send you spam</p>
                                            </div>
                                        </div>
                                        {/* review section */}
                                        <div className='optional-details'>
                                            <h4 className={`op-details-H`}>Optional details</h4>
                                            <div className={`container`}>
                                                <div className={`row`}>
                                                    <div className={`col-md-6`}>
                                                        <div className={`opd-fb`}>
                                                            <h6>Facebook</h6>
                                                            <p>Sign in with Facebook and discover your trusted connections to buyers</p>
                                                        </div>
                                                        <div className={`opd-g`}>
                                                            <h6>Google</h6>
                                                            <p>Connect your OLX account to your Google account for simplicity and ease.</p>
                                                        </div>
                                                    </div>
                                                    <div className={`col-md-6`}>
                                                        <div className={`opd-btn`}>
                                                            <button className={`btn btn-block`}>Disconnect</button>
                                                            <button className={`btn btn-block`}>Disconnect</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* save changes button */}
                                        <div className={`container`}>
                                            <div className={`row`}>
                                                <div className={`col-md-6 sv-btn`}>
                                                    <Link to='/'>Discard</Link>
                                                </div>
                                                <div className={`col-md-6 sv-btn`}>
                                                    <button className={`btn btn-block`}>Save changes</button>  {/* onClick={() => this.saveChanges()}*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={`not-login`}> {/* style={{height: '37vh',display: 'grid', placeItems: 'center' }}*/}
                            <div className={`div-not-login`}> {/*  className="container text-center" */}
                                <h1>You are not logged In</h1>
                                <p>Log In to see your profile</p>
                            </div>
                        </div>
                }
                <Footer />
            </>
        )
    }
}

export default Profile;