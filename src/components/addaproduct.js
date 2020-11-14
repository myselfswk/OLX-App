import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from './firebase/firebase';
import Navbar from './Navbar'
import Footer from './Footer'

import Logo from './img/logo.png';
import './addaproduct.css';

class Addaproduct extends Component {
    constructor() {
        super()
        this.state = {
            logInUser: '',
            adTitle: '',
            condition: '',
            description: '',
            price: '',
            type: '',
            country: '',
            address: '',
            username: '',
            authUser: '',
            phoneNo: ''
        }
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
                })
            // }
        })
    }
    render() {
        return (
            <>
                {
                    this.state.authUser ?
                        <div className={`addAPost`}>
                            {/* Navbar */}
                            <nav className="navbar navbar-light bg-light fixed-top">
                                <Link className="navbar-brand" to='/'>
                                    <span><i className={`fal fa-arrow-left btn-arrow-left-home`}></i> </span>
                                    <img className='logoProduct' src={Logo} alt="OLX logo" loading="lazy" />
                                </Link>
                            </nav>
                            {/* Add product */}
                            <h3 className='post-heading'>POST YOUR AD</h3>
                            <div className={`postACat`}>
                                <h3 className={`postACat-H `}>Choose a Category</h3>
                                <div className={`btnGroupSidebar`}>
                                    {/* dropdown-toggle */}
                                    {/* Mobiles */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fal fa-2x fa-mobile mr-2"></i>
                                            <span className={`postIcon ml-3`}>Mobiles</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-M" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Tablets</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Mobile Phones</Link>
                                        </div>
                                    </div>
                                    {/* Vehicles */}
                                    <div className="btn-group dropright">  {/* btn-secondary  */}
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-car-alt mr-2"></i>
                                            <span className={`postIcon ml-2`}>Vehicles</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-V" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Cars</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Cars on Installments</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Cars Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Spare Parts</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Buses, Vans &amp; Trucks</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Rickshaw &amp; Chingchi</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Vehicles</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Boats</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Tractors &amp; Trailers</Link>
                                        </div>
                                    </div>
                                    {/* Property for Sale */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fal fa-2x fa-building mr-2"></i>
                                            <span className={`postIcon ml-3`}>Property For Sale</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-S" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Land &amp; Plots</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Houses</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Apartments &amp; Flats</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Shops - Offices - Commercial Space</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Portions &amp; Floors</Link>
                                        </div>
                                    </div>
                                    {/* Property for Rent */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fal fa-2x fa-car-building mr-2"></i>
                                            <span className={`postIcon ml-1`}>Property For Rent</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-R" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Houses</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Apartments &amp; Flats</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Portions &amp; Floors</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Shops - Offices - Commercial Space</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Rooms</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Roommates &amp; Paying Guests</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Vacational Rentals - Guest Houses</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Land &amp; Plots</Link>
                                        </div>
                                    </div>
                                    {/* Electronics & Home Appliances */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-tv mr-2"></i>
                                            <span className={`postIcon ml-1`}>Electronics &amp; Home Appliances</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-E" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Computers &amp; Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>TV - Video - Audio</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Cameras &amp; Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Games &amp; Entertainment</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Home Appliances</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Generator, UPS &amp; Power Solutions</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Kitchen Appliances</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>AC &amp; Coolers</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Fridges &amp; Freezers</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Washing Machines &amp; Dryers</Link>
                                        </div>
                                    </div>
                                    {/* Bikes */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-motorcycle mr-2"></i>
                                            <span className={`postIcon ml-1`}>Bikes</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-B" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Motorcycles</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Spare Parts</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Bicycles</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>ATV &amp; Quads</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Scooters</Link>
                                        </div>
                                    </div>
                                    {/* Buisness, Industrial & Agriculture */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-chart-area mr-2"></i>
                                            <span className={`postIcon ml-2 mr-4`}> Buisness, Industrial &amp; Agriculture</span>
                                            <i className="fa fa-chevron-right postIcon" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Food &amp; Restaurants</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Trade &amp; Industrial</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Construction &amp; Heavy Machinery</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Agriculture</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Business &amp; Industry</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Medical &amp; Pharma</Link>
                                        </div>
                                    </div>
                                    {/* Services */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fad fa-2x fa-concierge-bell mr-2"></i>
                                            <span className={`postIcon ml-2`}> Services</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-ser" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Education &amp; Classes</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Travel &amp; Visa</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Car Rental</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Drivers &amp; Taxi</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Web Development</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Services</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Electronics &amp; Computer Repair</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Event Services</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Health &amp; Beauty</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Maids &amp; Domestic Help</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Movers &amp; Packers</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Home &amp; Office Repair</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Catering &amp; Restaurant</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Farm &amp; Fresh Food</Link>
                                        </div>
                                    </div>
                                    {/* Jobs */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-briefcase mr-2"></i>
                                            <span className={`postIcon ml-3`}>Jobs</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-J" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Online</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Marketing</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Advertising &amp; PR</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Education</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Customer Service</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Sales</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>IT &amp; Networking</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Hotels &amp; Tourism</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Clerical &amp; Administration</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Human Resources</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Accounting &amp; Finance</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Manufacturing</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Medical</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Domestic Staff</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Part - Time</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Jobs</Link>
                                        </div>
                                    </div>
                                    {/* Animals */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-horse-head mr-2"></i>
                                            <span className={`postIcon ml-3`}>Animals</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-A" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Fish &amp; Aquariums</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Birds</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Hens &amp; Aseel</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Cats</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Dogs</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Livestock</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Horses</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Pet Food &amp; Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Animals</Link>
                                        </div>
                                    </div>
                                    {/* Furniture & Home Decoration */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-couch mr-2"></i>
                                            <span className={`postIcon ml-2`}>Furniture &amp; Home Decoration</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-F" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Sofa &amp; Chairs</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Beds &amp; Wardrobes</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Home Decoration</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Tables &amp; Dining</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Garden &amp; Outdoor</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Painting &amp; Mirrors</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Rugs &amp; Carpets</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Curtains &amp; Blinds</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Office Furniture</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Household Items</Link>
                                        </div>
                                    </div>
                                    {/* Fashion & Beauty */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-tshirt mr-2"></i>
                                            <span className={`postIcon ml-1`}> Fashion &amp; Beauty</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-fas" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Accessories</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Clothes</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Footwear</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Jewellery</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Make Up</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Skin &amp; Hair</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Watches</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Wedding</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Lawn &amp; Pret</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Couture</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Fashion</Link>
                                        </div>
                                    </div>
                                    {/* Books, Sports & Hoddies */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-cricket mr-2"></i>
                                            <span className={`postIcon ml-2`}>Books, Sports &amp; Hoddies</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-BSH" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Books &amp; Magazines</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Musical Instruments</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Sports Equipment</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Gym &amp; Fitness</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Other Hobbies</Link>
                                        </div>
                                    </div>
                                    {/* Kids */}
                                    <div className="btn-group dropright">
                                        <button type="button" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="far fa-2x fa-child mr-2"></i>
                                            <span className={`postIcon ml-3`}> Kids</span>
                                            <i className="fa fa-chevron-right postIcon postIcon-K" aria-hidden="true"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Kids Furniture</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Toys</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Prams &amp; Walkers</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Swings &amp; Slides</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Kids Bikes</Link>
                                            <Link to='/addaproduct/attributes' className='dropdown-item'>Kids Accessories</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className={`postACat-footer`}>
                                <span>
                                    <Link to={`/`}>Sitemap</Link>
                                </span>
                                <span className={`postACat-footer-S`}>Free Classifieds in Pakistan. © 2006-2020 OLX</span>
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

export default Addaproduct;