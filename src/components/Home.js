import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import './Home.css';
import design from './img/design-ls.webp';
import machine from './img/machine-ls.webp';
import phone from './img/phone-ls.webp';
import sofa from './img/sofa-ls.webp';
import heroBanner from './img/herobg.jpg';
import heroAd from './img/home_add.jpeg';
import { db } from './firebase/firebase';

class Home extends React.Component {
    state = {
        url: '',
        items: [],
        id: ''
    }

    componentDidMount() {
        let items = []
        let id = db.ref('Items').push().key;
        console.log(id);
        db.ref(`users`).on(`value`,(data)=>{
            console.log(data.val())
        console.log(`calla h`)

        })
        // db.ref('Items').on('value', (data) => {
        //     for (var key in data.val()) {
        //         items.push(data.val()[key])
        //         console.log(data.val()[key]);
        //     }
        // console.log(`calla h`)

        // })
        setTimeout(() => {

            this.setState({
                items: items,
                id: id
            })
        }, 4000)
    }
    render() {
        const { items } = this.state;
        console.log(items);

        return (
            <>
                <Navbar />
                <div className="home_page">
                    <div className="hero_banner">
                        <img src={heroBanner} alt="hero_banner" />
                    </div>
                    <div className="hero_ad">
                        <img src={heroAd} alt={`hero ad`} />
                    </div>
                </div>
                {/*last search*/}
                <div className={`container app-LS`}>
                    <div className={`row ls-h`}>
                        Based on your last search
                    <span><Link to="/" className={`ls-l`}>View more</Link></span>
                    </div>
                    <div className={`row`}>
                        <div className={`col last-search`}>
                            <div className={`row justify-content-md-center`}>
                                <span className={`featured`}>Featured</span>
                                <img src={design} alt={``} />
                                <span><i className="fal fa-heart"></i></span>
                            </div>
                            <span className={`row float-left ls-content`}></span>
                            <div className={`row justify-content-md-center`}>
                                <h2>Rs 2,300,000</h2>
                                <p>Plot size 300 square fit</p>
                            </div>
                        </div>
                        <div className={`col last-search`}>
                            <div className={`row justify-content-md-center`}>
                                <span className={`featured`}>Featured</span>
                                <img src={machine} alt={``} />
                                <span><i className="fal fa-heart"></i></span>
                            </div>
                            <span className={`row float-left ls-content`}></span>
                            <div className={`row justify-content-md-center`}>
                                <h2>Rs 45,000</h2>
                                <p>American tradmill exellent working</p>
                            </div>
                        </div>
                        <div className={`col last-search`}>
                            <div className={`row justify-content-md-center`}>
                                <span className={`featured`}>Featured</span>
                                <img src={phone} alt={`Phone Pics`} />
                                <span><i className="fal fa-heart"></i></span>
                            </div>
                            <span className={`row float-left ls-content`}></span>
                            <div className={`row justify-content-md-center`}>
                                <h2>Rs 100,000</h2>
                                <p>Iphone 11 pro ulta</p>
                            </div>
                        </div>
                        <div className={`col last-search`}>
                            <div className={`row justify-content-md-center`}>
                                <span className={`featured`}>Featured</span>
                                <img src={sofa} alt={`Sofa`} />
                                <span><i className="fal fa-heart"></i></span>
                            </div>
                            <span className={`row float-left ls-content`}></span>
                            <div className={`row justify-content-md-center`}>
                                <h2>Rs 50,000</h2>
                                <p>Sofa set (Habitt Company)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* post */}

                {
                    items ? items.map((item, index) => {
                        return <Link key={index} to={`/post/${item.id}`}>
                            <div className='homeAd'>
                                <img src={item.url || 'https://via.placeholder.com/150'} className=" homeAdImage" alt='iamgeUpload' />
                                <div className='homeAdDetails'>
                                    <span className='homeAdTitle'>{item.adTitle}</span>
                                    <span className='homeAdPrice'>Rs: {item.price}</span>
                                    <span className='homeAdCondition'>{item.condition}</span>
                                </div>
                            </div>
                        </Link>
                    })
                        : <div>
                            {<h1>No Results To Show</h1>}
                        </div>

                }

                <Footer />
            </>
        )
    }
}

export default Home;