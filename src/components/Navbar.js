import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { auth, db } from '../components/firebase/firebase';
import { signInWithFB } from '../store/action/index';
import { connect } from 'react-redux'

import './Navbar.css';
import logo from './img/logo.png';
import guiter from './img/loginEntryPointPost-Guiter.webp';
import hearts from './img/loginEntryPointPost-Hearts.webp';
import people from './img/loginEntryPointPost-People.webp';
import Notification from './img/notifications.webp';
import olxIcon from './img/OLX-icon.PNG';

function Navbar(props) {
    const [toggle, setToggle] = useState(true);
    const toggleRef = useRef();
    const [authenticateUser, setAuthenticateUser] = useState({});
    const addClass = () => {
        toggleRef.current.classList.add('animate_chevron_add');
        toggleRef.current.classList.remove('animate_chevron_remove');
        setToggle(false);
    }
    //console.log(toggle);
    const removeClass = () => {
        toggleRef.current.classList.add('animate_chevron_remove');
        toggleRef.current.classList.remove('animate_chevron_add');
        setToggle(true);
    }
    //console.log(toggle);
    const [signUpAndPhone, setsignUpAndPhone] = useState("");
    const [logInUser, setLogInUser] = useState("");

    //state for signUp and signIn
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        user: [],
        about: '',
        photoURL: '',
        phoneNumber: ''
    });

    //console.log(state);

    const onInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    //console.log(setState);
    console.log(state);

    //SignUp Function
    const signUpFunc = () => {
        let users = db.ref("users").push().key;
        console.log(state.email, state.password);

        if (state.email === "" || state.email === " " || state.email === undefined) {
            alert("Please, Enter Username..");
        }
        else if (state.username === "" || state.username === " " || state.username === undefined) {
            alert("Please, Enter Email..");
        }
        else if (state.password === "" || state.password === " " || state.password === undefined) {
            alert("Please, Enter Password..");
        }
        else {
            let flag = true;
            auth.createUserWithEmailAndPassword(state.email.toLowerCase(), state.password)
                .then((response) => {
                    alert("User Has Been Created Successfully...!");
                })
                .catch((err) => {
                    alert(err.message);
                    if (err) {
                        flag = false;
                    }
                })

            setTimeout(() => {
                if (flag) {
                    db.ref("users/" + users).set({
                        id: users,
                        username: state.username,
                        email: state.email.toLowerCase(),
                        password: state.password,
                        photourl: "",
                        about: "",
                        phoneNumber: "",
                    });
                }
            }, 2000)
        }
    }


    const signInFunc = () => {
        //console.log(state.email, state.password);

        if (state.email === "" || state.email === " " || state.email === undefined) {
            alert("Please, Enter Email..");
        }
        else if (state.password === "" || state.password === " " || state.password === undefined) {
            alert("Please, Enter Password..");
        }
        else {
            auth.signInWithEmailAndPassword(state.email.toLowerCase(), state.password)
                .then((response) => {
                    alert("User has been Sign In Successfully...!");
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    //SignUp with Facecbook
    /* 
    const signInWithFB = () => {
        console.log("FB Button is clicked");
        let id = db.ref("users").push().key;
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
            var user = result.user;
            let userFlag = true;
            console.log(user);

            let key = [];
            db.ref("users").once("value", (data) => {
                for (key in data.val()) {
                    if (user.email === data.val()[key].email) {
                        userFlag = false;
                    }
                }
            })

            setTimeout(() => {
                console.log(userFlag)
                if (userFlag) {
                    db.ref("users/" + id).set({
                        id: id,
                        username: user.displayName,
                        photourl: user.photoURL,
                        about: "",
                        phoneNumber: "",
                        email: user.email,
                        password: "",
                    })
                }
            }, 2000)
        })
            .catch((err) => {
                alert(err.message);
            })
    }
    */

    //SignUp With Google
    const signInWithGoogle = () => {
        console.log("Google Button is clicked");
        let id = db.ref("users").push().key;
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {
            var user = result.user;
            let userFlag = true;

            let key = [];
            db.ref("users").once("value", (data) => {
                for (key in data.val()) {
                    if (user.email === data.val()[key].email) {
                        userFlag = false;
                    }
                }
            })

            setTimeout(() => {
                console.log(userFlag)
                if (userFlag) {
                    db.ref("users/" + id).set({
                        id: id,
                        username: user.displayName,
                        photourl: user.photoURL,
                        about: "",
                        phoneNumber: "",
                        email: user.email,
                        password: "",
                    })
                }
            }, 2000)
        })
            .catch((err) => {
                alert(err.message);
            })
    }

    let history = useHistory();

    const postProduct = () => {
        history.push('/addaproduct');
        console.log('Post Button');
    }

    const profiles = () => {
        history.push('/profile');
        console.log("Profile is view")
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setAuthenticateUser(user)
            // if (user) {
                db.ref('users').once('value', (data) => {
                    for (var key in data.val()) {
                        if (data.val()[key].email === user.email) {
                            setLogInUser(data.val()[key]);
                        }
                    }
                    console.log(logInUser);
                })
            // }
        })
    }, [])  //logInUser

    //console.log(signInWithFB())

    return (
        <div>
            {/* first Navbar */}
            <div className="fixed-top">
                <div className="navbar_header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 logo my-3 d-flex" style={{ justifyContent: 'space-around' }}>
                                <Link to="/">
                                    <img src={logo} height="50" alt="Olx Logo" />
                                </Link>
                                <button className="navbar-toggler nav-btn" data-target="#navbar" data-toggle="collapse">
                                    <span className="fa fa-bars"></span>
                                </button>
                            </div>
                            <div className="col-md-3 location my-3">
                                <span className="fa fa-search search_icon"></span>
                                <span><input type="text" className="form-control input_icon" placeholder="Pakistan" /></span>
                                <span className="fa fa-chevron-down chevron_icon"></span>
                                {/* 
                                <span className="fa fa-search search_icon">
                                    <input type="text" className="form-control" placeholder="Pakistan" />
                                </span>
                                <span className="fa fa-chevron-down chevron_icon"></span> */}
                            </div>
                            <div className="col-md-5 search my-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder=" Find Cars, Mobile Phones and more..." />
                                    <div className="input-group-append">
                                        <div className="input-group-text search_icon" id="btnGroupAddon">
                                            <span className="fa fa-search"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 login my-3">
                                {
                                    authenticateUser ?
                                        <div className={`user-flex`}>
                                            <span><i className={`fal fa-2x mt-2 fa-comment`}></i></span>
                                            <span>
                                                <li className="nav-item dropdown">
                                                    <Link to="/" className="nav-link dropdown-user" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className={`fal fa-2x mt-2 mx-3 fa-bell`}></i>
                                                    </Link>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <div className="dropdown-item">
                                                            <p>No Notification</p>
                                                            <small>Check Here Back</small><br />
                                                            <img src={Notification} height="50" alt="Noti" style={{margin:"auto"}} />
                                                        </div>
                                                    </div>
                                                </li>
                                            </span>
                                            <span>
                                                <li className="nav-item dropdown">
                                                    <Link to="/" className="nav-link dropdown-toggle dropdown-user" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className={`fal fa-2x mt-2 fa-user`}></i>
                                                    </Link>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <h6 className="dropdown-item">Hello, </h6>
                                                        <div className="dropdown-item">
                                                            {
                                                                //logInUser.username
                                                                <div className={`container profile`} style={{ width: "270px" }}>
                                                                    <div className={`row`}>
                                                                        <div className={`col-md-4`}>
                                                                            <img src={logInUser.photourl !== "" ? logInUser.photourl : "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"} className={`img-fluid rounded rounded-circle`} width={`70`} alt="profile pic" />
                                                                        </div>
                                                                        <div className={`col-md-8`}>
                                                                            <Link to='/profile' className={`username-profile`} onClick={() => profiles()}>
                                                                                <h4 className={`mt-2 username-profile`}>
                                                                                    {logInUser.username}
                                                                                </h4>
                                                                                <small>View And Edit Profile</small>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="dropdown-divider" />
                                                        <Link to="/" className="dropdown-item" onClick={() => auth.signOut()}>
                                                            <i className="fal fa-sign-out"></i> SignOut
                                                        </Link>
                                                    </div>
                                                </li>
                                            </span>
                                            <button className="btn" type='button' onClick={() => postProduct()}>
                                                <span className="fa fa-plus mx-1">Sell</span>
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <Link className={`login-link`} type='button' data-toggle='modal' data-target='#modal_login' to="/">Login</Link>
                                            <button className="btn" type='button' data-toggle='modal' data-target='#modal_login'>
                                                <span className="fa fa-plus mx-1">Sell</span>
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modals for login and sell */}
            <div className="modal fade" id="modal_login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close mb-5 btn-close btn-lg" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {
                            signUpAndPhone === "" ?
                                <div className="modal-body">
                                    {/* carousel */}
                                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={guiter} className="d-block w-100 modal-header-img" alt="Guiter Icon" />
                                                <p className={`text-center`}>Help make OLX safer place to buy and sell</p>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={hearts} className="d-block w-100 modal-header-img" alt="Multiple Hearts" />
                                                <p className={`text-center`}>Contact and close deals faster</p>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={people} className="d-block w-100 modal-header-img" alt="people" />
                                                <p className={`text-center`}>Save all your favorite items at one place</p>
                                            </div>
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true" />
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                    {/* main content */}
                                    <button className="btn btn-white btn_login_custom btn-block my-2"
                                        onClick={() => setsignUpAndPhone("phone")}>
                                        Continue with phone
                                    </button>

                                    <button className="btn btn-white btn_login_custom btn-block my-2"
                                        onClick={() => props.signinwithfb()} >
                                        <span className="fab fa-facebook mx-2"></span>
                                        Continue with facebook
                                    </button>

                                    <button className="btn btn-white btn_login_custom btn-block my-2"
                                        onClick={() => signInWithGoogle()}>
                                        <span className="fab fa-google mx-2"></span>
                                        Continue with google
                                    </button>

                                    <button className="btn btn-white btn_login_custom btn-block my-2"
                                        onClick={() => setsignUpAndPhone("email")}>
                                        <span className="mx-2"></span>{/* fab fa-message  */}
                                        Continue with email
                                    </button>
                                    <p className="text-center py-3 para_login">
                                        We won't share your personal details with anyone
                                    </p>
                                    <p className="text-center py-3 para_login">
                                        If you continue, you are accepting <Link to="/">OLX Terms and Conditions and Privacy Policy</Link>
                                    </p>
                                </div>
                                : signUpAndPhone === "email" ?
                                    <div className={`text-center`}>
                                        <span>
                                            <i className={`fal fa-arrow-left btn-arrow-left`}
                                                onClick={() => setsignUpAndPhone("")}></i>
                                        </span>
                                        <div className={`modal-body`}>
                                            <img src={olxIcon} alt={`OLX LOGO`} />
                                            <h3 className={`email_h`}>Enter Your Email &amp; Password</h3>
                                            <input type="username" name="username" className="modal_input form-control" placeholder="Username" onChange={(e) => onInputChange(e)} />
                                            <input type="email" name="email" className="modal_input form-control" placeholder="Email Address" onChange={(e) => onInputChange(e)} />
                                            <input type="password" name="password" className="modal_input form-control" placeholder="Password" onChange={(e) => onInputChange(e)} />
                                            <button type={`button`} className="btnNext" onClick={() => signUpFunc()}>Sign Up</button>
                                            <p>--OR--</p>
                                            <button type={`button`} className="btnNext" onClick={() => setsignUpAndPhone("signin")}>Sign In</button>
                                            <p>We won't reveal your email to anyone else nor use it to send you spam</p>
                                        </div>
                                    </div>
                                    : signUpAndPhone === "phone" ?
                                        <div className={`text-center`}>
                                            <span>
                                                <i className={`fal fa-arrow-left btn-arrow-left`}
                                                    onClick={() => setsignUpAndPhone("")}></i>
                                            </span>
                                            <div className={`modal-body`}>
                                                <img src={olxIcon} alt={`OLX LOGO`} />
                                                <h3 className={`email_h`}>Enter Your Number</h3>
                                                <input type="number" name="number" className="modal_input form-control" placeholder="Enter Your Phone Number" />
                                                <input type="password" name="password" className="modal_input form-control" placeholder="Enter Your Password" />
                                                <button type={`button`} className="btnNext">Sign Up Through Phone</button>
                                                <p>We won't reveal your email to anyone else nor use it to send you spam</p>
                                            </div>
                                        </div>
                                        : signUpAndPhone === "signin" ?
                                            <div className={`text-center`}>
                                                <span>
                                                    <i className={`fal fa-arrow-left btn-arrow-left`}
                                                        onClick={() => setsignUpAndPhone("email")}></i>
                                                </span>
                                                <div className={`modal-body`}>
                                                    <img src={olxIcon} alt={`OLX LOGO`} />
                                                    <h3 className={`email_h`}>Enter Your Email &amp; Password</h3>
                                                    <input type="email" name="email" className="modal_input form-control" placeholder="Enter Your Email Address" onChange={(e) => onInputChange(e)} />
                                                    <input type="password" name="password" className="modal_input form-control" placeholder="Enter Your Password" onChange={(e) => onInputChange(e)} />
                                                    <button type={`button`} className="btnNext" onClick={() => signInFunc()}>Sign In</button>
                                                    <p>We won't reveal your email to anyone else nor use it to send you spam</p>
                                                </div>
                                            </div>
                                            : null
                        }
                    </div>
                </div>
            </div>
            {/* Second Modal for signUp with email */}
            {/*<div className="modal fade" id="modal_login_email" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close mb-5 btn-close btn-lg" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                         main content 
                        
                    </div>
                </div>
            </div> 
            */}
            {/* Second Nav Bar*/}
            <nav className="navbar navbar-expand-md navbar_custom sec-nav">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown p-2">
                                <Link
                                    onFocus={toggle ? addClass : !toggle ? removeClass : addClass}
                                    onBlur={removeClass}// role="button" aria-haspopup="true" aria-expanded="false"
                                    className="nav-link text-dark font-weight-bold" to="" id="navbarDropdown"
                                    data-toggle="dropdown">
                                    ALL CATEGORIES
                                    <span ref={toggleRef} className={`mx-1 fa fa-chevron-down`}></span>
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="container-fluid">
                                        <div className="row navbar-dropdown-child">
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Vehicles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tractors &amp; Trailers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Boats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rickshaw &amp; Chingchi</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Buses, Vans &amp; Trucks</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Spare Parts</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars on Installments</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cars</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Vehicles</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Mobiles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Mobile Phones</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tablets</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Electronics &amp;
                                            Home Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Washing Machines &amp; Dryers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Fridges &amp; Freezers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">AC &amp; Coolers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kitchen Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Generators, UPS &amp; Power
                                            Solutions</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Home Appliances</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Games &amp; Entertainment</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cameras &amp; Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Computers &amp; Accessories</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Electronics &amp;
                                            Property for Sale</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Portions &amp; Floors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Shops - Offices - Commercial
                                            Space</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Apartments &amp; Flats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Houses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Land &amp; Plots</Link>
                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Animals</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Animals</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Pet Food &amp; Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Horses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Livestock</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Dogs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Cats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Hens &amp; Aseel</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Birds</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Fish &amp; Aquariums</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Furniture &amp;
                                                Home Decor
                                        </Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Household Items</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Office Furniture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Curtains &amp; Blinds</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rugs &amp; Carpets</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Painting &amp; Mirrors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Garden &amp; Outdoor</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Tables &amp; Dining</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Home Decoration</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Beds &amp; Wardrobes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sofa &amp; Chairs</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Business,
                                            Industrial &amp; Agriculture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Medical &amp; Pharma</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Business &amp; Industry</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Agriculture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Construction &amp; Heavy Machinery
                                            </Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Trade &amp; Industrial</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Food &amp; Restaurants</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Business for Sale</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Bikes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Scooters</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">ATV &amp; Quads</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Bicycles</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Spare Parts</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Motorcycles</Link>

                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Fashion &amp; Beauty</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Fashion</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Couture</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Lawn &amp; Pret</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Wedding</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Watches</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Skin &amp; Hair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Make Up</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Jewellery</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Footwear</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Clothes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accessories</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Property for Rent</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Land &amp; Plots</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Vacation Rentals - Guest Houses</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Roommates &amp; Paying Guests</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Rooms</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Shops - Offices - Commercial Space</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Portions &amp; Floors</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Apartments &amp; Flats</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Houses</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Jobs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Jobs</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Part - Time</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Domestic Staff</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Medical</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Manufacturing</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Accounting &amp; Finance</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Human Resources</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Clerical &amp; Administration</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Hotels &amp; Tourism</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">IT &amp; Networking</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sales</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Customer Service</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Education</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Advertising &amp; PR</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Marketing</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Online</Link>

                                            </div>
                                            <div className="col-md-3 col-sm-6 col-xsm-6">
                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Farm &amp; Fresh Food</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Catering &amp; Restaurant</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Home &amp; Office Repair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Movers &amp; Packers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Maids &amp; Domestic Help</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Health &amp; Beauty</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Event Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Electronics &amp; Computer Repair</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Services</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Web Development</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Drivers &amp; Taxi</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Car Rental</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Travel &amp; Visa</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Education &amp; Classes</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Books, Sports &amp; Hobbies</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Other Hobbies</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Gym &amp; Fitness</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Sports Equipment</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Musical Instruments</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Books &amp; Magazines</Link>

                                                <Link className="dropdown-item nav-link-text font-weight-bold" to="/">Kids</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Accessories</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Bikes</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Swings &amp; Slides</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Prams &amp; Walkers</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Toys</Link>
                                                <Link className="dropdown-item nav-link-text" to="/">Kids Furniture</Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Mobile Phones</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Cars</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Motorcycles</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Houses</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Tv-Video-Audio</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Tablets</Link></li>
                            <li><Link to="/" className="nav-link nav-link-text p-2">Land &amp; Plots</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}

//export default Navbar;

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    signinwithfb: () => dispatch(signInWithFB())
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);