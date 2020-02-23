import React, { Component } from 'react';
import BlueLogo from './img/logo-blue-transparent.png';
import YellowLogo from './img/logo-yellow-transparent.png';
import './App.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-blue">
          <Link to="/"><img src={YellowLogo} alt='logo' className="logo-sizing left-margin top-margin btm-margin"/></Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
