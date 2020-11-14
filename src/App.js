import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Addaproduct from './components/addaproduct';
import Attributes from './components/Attributes';
import Profile from './components/profile';
import Post from './components/Post'

/* 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/addaproduct' component={Addaproduct} />
          <Route exact path='/addaproduct/attributes' component={Attributes} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/post' component={Post} />
          <Route exact path='/post/:id' component={Post} />
        </Router>
      </div>
    )
  }
}

export default App;
