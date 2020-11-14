import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { db, auth, storage } from './firebase/firebase';
import Navbar from './Navbar';
import Footer from './Footer'

import Logo from './img/logo.png';
import './Attributes.css';

class Attributes extends Component {
    constructor() {
        super()
        this.state = {
            logInUser: [],
            adTitle: '',
            description: '',
            condition: '',
            price: '',
            type: '',
            country: '',
            address: '',
            username: '',
            authUser: [],
            image: null,
            url: '',
            progress: 0,
            phoneNo: '',
            red: false,
            id: ''
        }
        //this.input = React.createRef();
        this.imageChange = this.imageChange.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({ authUser: user })
            if (user) {
                db.ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email === user.email) {
                            this.setState({
                                authUser: data.val()[key]
                            })
                        }
                    }
                })
            }
        })
    }


    setItemsState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.value);
    }

    getValues = () => {
        if (this.state.adTitle === '' || this.state.adTitle === ' ' || this.state.adTitle === undefined) {
            alert('Please Enter Ad title');
        }
        else if (this.state.type === '' || this.state.type === ' ' || this.state.type === undefined) {
            alert('Please Enter type');
        }
        else if (this.state.condition === '' || this.state.condition === ' ' || this.state.condition === undefined) {
            alert('Please Enter Condition');
        }
        else if (this.state.description === '' || this.state.description === ' ' || this.state.description === undefined) {
            alert('Please Enter description');
        }
        else if (this.state.price === '' || this.state.price === ' ' || this.state.price === undefined) {
            alert('Please Enter Price');
        }
        else if (this.state.country === '' || this.state.country === ' ' || this.state.country === undefined) {
            alert('Please Enter country');
        }
        else if (this.state.address === '' || this.state.address === ' ' || this.state.address === undefined) {
            alert('Please Enter address');
        }
        else if (this.state.phoneNo === '' || this.state.phoneNo === ' ' || this.state.phoneNo === undefined) {
            alert('Please Enter phone number');
        }
        else {
            let id = db.ref('Items').push().key

            db.ref('Items').child(id).set({
                ...this.state,
                id: id
            })
                .then(() => {
                    this.setState({
                        red: true
                    })
                    alert('Your Post Has Been Submitted Successfully')
                })
        }
    }



    imageChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    imageUpload = () => {
        if (this.state.image === null) {
            alert('Please attached an image');
        }
        else {
            const { image } = this.state;
            const uploadImage = storage.ref(`images/${image.name}`).put(image);
            uploadImage.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress });
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ url })
                    })
                });
        }
    }

    render() {
        let { authUser } = this.state;
        console.log(authUser);
        console.log(this.state)
        return (
            this.state.red ? <Redirect to='/' />
                :
                <>
                    {
                        this.state.authUser ?
                            <div className={`addAttributes`}>
                                {/* Navbar */}
                                <nav className="navbar navbar-light bg-light fixed-top">
                                    <Link className="navbar-brand" to='/addaproduct'>
                                        <span><i className={`fal fa-arrow-left btn-arrow-left-home`}></i> </span>
                                        <img className='logoAttribute' src={Logo} alt="OLX Logo" loading="lazy" />
                                    </Link>
                                </nav>

                                {/* Attributes */}
                                <h3 className='postAttributes-H'>POST YOUR AD</h3>
                                <div className='attribute-box'>
                                    <div className='attribute-box-H'><h5>Please Fill Up This Form:</h5></div>
                                    <div className='attribute-detail'>
                                        <h5 className='include-details'>INCLUDE SOME DETAILS</h5>
                                        <div className='ad-title'>
                                            <p className='ad-title-H' >Ad Title <span style={{ color: "red" }}>*</span></p>
                                            <input type="text" name='adTitle' className="form-control title-input" aria-describedby="button-addon2" onChange={(e) => this.setItemsState(e)} />
                                            <p className='mention-feature'>Mention the key features of your item (e.g. brand, model, age, type) &nbsp; (0 / 70)</p>
                                            <p className='ad-title-H' >Type <span style={{ color: "red" }}>*</span></p>
                                            <input type="text" name='type' className="form-control title-input" aria-describedby="button-addon2" onChange={(e) => this.setItemsState(e)} />
                                            <p className={`mt-3`}>Condition <span style={{ color: "red" }}>*</span></p>
                                            <input name='condition' type="text" className="form-control title-input" aria-describedby="button-addon2" onChange={(e) => this.setItemsState(e)} />
                                            <p className='attributes-desc'>Description <span style={{ color: "red" }}>*</span></p>
                                            <textarea name='description' className='attribute-textArea' cols="50" rows="5" onChange={(e) => this.setItemsState(e)}></textarea><br />
                                            <p className='mention-feature'>Include condition, features and reason for selling (0 / 4096)</p>
                                        </div>
                                    </div>

                                    {/* Price set */}
                                    <div className='A-setPrice'>
                                        <h4>SET A PRICE</h4><br />
                                        <p className='mention-feature'>Price <span style={{ color: "red" }}>*</span></p>
                                        <div className="input-group A-price flex-nowrap">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="addon-wrapping">Rs</span>
                                            </div>
                                            <input name='price' type="text" className="form-control A-priceInput" aria-describedby="addon-wrapping" onChange={(e) => this.setItemsState(e)} />
                                        </div><br />
                                    </div>

                                    {/* Image upload */}
                                    <div className='choose-Files ml-2 mt-2'>
                                        <h4>UPLOAD UP TO 6 PHOTOS</h4>
                                        <label className='filesForImage ml-2'>Select files:</label> <br />
                                        <input className={`ml-2`} type="file" id="files" name="files" multiple onChange={this.imageChange} /><br />
                                        {/* <input type="submit" className='btn btn-dark' /> <br /><br /> */}
                                        <progress value={this.state.progress} max='100' />  <br />
                                        <img src={this.state.url || 'https://via.placeholder.com/150'} alt={`Product`} className="img-thumbnail ml-2" height='160' width='160' onClick={this.imageUpload} />
                                        <p className='mandatory ml-2'>This field is mandatory</p>
                                    </div>

                                    {/* Location for order */}
                                    <div className='location-url'>
                                        <h4>ENTER YOUR LOCATION</h4>
                                        <p className='attributes-desc'>Your Country <span style={{ color: "red" }}>*</span></p>
                                        <input type="text" name='country' className="form-control title-input" aria-describedby="button-addon2" onChange={(e) => this.setItemsState(e)} />
                                        <p className='attributes-desc'>Your Address <span style={{ color: "red" }}>*</span></p>
                                        <input type="text" name='address' className="form-control title-input" aria-describedby="button-addon2" onChange={(e) => this.setItemsState(e)} />
                                        <br />
                                    </div>
                                    {/* review section */}
                                    <div className='details-review'>
                                        <span>REVIEW YOUR DETAILS</span><br /><br />
                                        <div className='user-image'>
                                            <img className='avatar img-fluid rounded rounded-circle' src={authUser ? authUser.photourl : "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"} alt="Demo Avator" loading="lazy" />
                                        </div>
                                        <p className='mention-feature'>Name <span style={{ color: "red" }}>*</span></p>
                                        <input name='username' readOnly type="text" ref={this.input} className="form-control title-input mar" placeholder="User Name" value={authUser ? authUser.username : ""} /> {/*  onChange={(e) => this.setItemsState(e)} */}
                                        <p className='mention-feature'>Contact No. <span style={{ color: "red" }}>*</span></p>
                                        <input name='phoneNo' autoComplete='off' type="text" className="form-control title-input mar" placeholder="Contact No." onChange={(e) => this.setItemsState(e)} /> <br /> {/*  onChange={(e) => this.setItemsState(e)}*/}
                                        <input type="submit" className='btn btn-success' onClick={() => this.getValues()} />

                                    </div>
                                </div>

                                {/* Footer */}
                                <div className={`attribute-footer`}>
                                    <span>
                                        <Link to={`/`}>Sitemap</Link>
                                    </span>
                                    <span className={`attribute-footer-S`}>
                                        Free Classifieds in Pakistan. © 2006-2020 OLX
                                </span>
                                </div>
                            </div>
                            :
                            <>
                                <Navbar />
                                <div className={`not-login`}> {/* style={{height: '37vh',display: 'grid', placeItems: 'center' }}*/}
                                    <div className={`div-not-login`}> {/*  className="container text-center" */}
                                        <h1>You are not logged In</h1>
                                        <p>Log In to see your profile</p>
                                    </div>
                                </div>
                                <Footer />
                            </>
                    }
                </>
        )
    }
}


export default Attributes;