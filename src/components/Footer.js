import React from 'react'
import './Footer.css';
import './Home.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            {/* First Footer */}
            <div className="hero_end">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 hero_bottom_img"></div>
                        <div className="col-md-4 hero_bottom_center pt-3">
                            <h2>TRY THE OLX APP</h2>
                            <h5>Buy, sell and find just about anything using the app on your mobile.</h5>
                        </div>
                        <div className="col-md-4 hero_bottom_right pt-5">
                            <h5>Get your app today</h5>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5 apple_logo"></div>
                                    <div className="col-md-5 android_logo"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Second Footer */}
            <div className="container">
                <div className="row">
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">Polular Categories</h6></li>
                        <li><Link className="footer_link" to='/'> Cars</Link></li>
                        <li><Link className="footer_link" to='/'> Flats for rent</Link></li>
                        <li><Link className="footer_link" to='/'> Jobs</Link></li>
                        <li><Link className="footer_link" to='/'> Mobile Phones</Link></li>
                    </ul>
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">TRENDING SEARCHES</h6></li>
                        <li><Link className="footer_link" to='/'> Bikes</Link></li>
                        <li><Link className="footer_link" to='/'> watches</Link></li>
                        <li><Link className="footer_link" to='/'> Books</Link></li>
                        <li><Link className="footer_link" to='/'> Dogs</Link></li>
                    </ul>

                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">About us</h6></li>
                        <li><Link className="footer_link" to='/'> About OLX Group</Link></li>
                        <li><Link className="footer_link" to='/'> OLX Blog</Link></li>
                        <li><Link className="footer_link" to='/'> Contact Us</Link></li>
                        <li><Link className="footer_link" to='/'> OLX for Businesses</Link></li>
                    </ul>
                    <ul className='col-md-2 footer_ul'>
                        <li><h6 className="">OLX</h6></li>
                        <li><Link className="footer_link" to='/'> Help</Link></li>
                        <li><Link className="footer_link" to='/'> Sitemap</Link></li>
                        <li><Link className="footer_link" to='/'> Legal &amp; Privacy information</Link></li>
                    </ul>
                    <ul className='col-md-4 footer_ul'>
                        <li><h6 className="">Follow us</h6></li>
                        <li>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-facebook"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-twitter"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-youtube"></span></Link>
                            <Link to='/' className="text-dark mx-2"><span className="fab fa-instagram"></span></Link>
                        </li>
                        <li>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5 footer_apple_logo footer-logo"></div>
                                    <div className="col-md-5 footer_android_logo footer-logo"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer_bottom">
                <div className="container">
                    <div className="float-left text-white">
                        <span className="font-weight-bold">Other counteries: </span>
                        <Link className="link-F" to="/">India</Link> -
                        <Link className="link-F" to="/">South Africa</Link> -
                        <Link className="link-F" to="/">Indonesia</Link> 
                        </div>
                    <div className="float-right text-white">
                        <span className="font-weight-bold">Free Classifieds in Pakistan </span>
                        &copy; 2006-2020 OLX
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
