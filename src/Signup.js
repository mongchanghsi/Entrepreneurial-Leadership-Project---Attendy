import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import { Link } from 'react-router-dom';

class Signup extends Component {
  render(){
    return(
      <div>
        <Navbar />

        <div className="container">
          <div className="center">
            <div className="card card-size">
              <div className="card-body">
                <h5 className="card-title"> Sign Up </h5>
                <form>
                  <div className="form-group">
                    <label> Username </label>
                    <input type="username" className="form-control" id="username"/>
                  </div>

                  <div className="form-group">
                    <label> Password </label>
                    <input type="password" className="form-control" id="password"/>
                  </div>

                  <div className="form-group">
                    <label> Confirm Password </label>
                    <input type="password" className="form-control" id="password2"/>
                  </div>

                  <div className="form-group">
                    <label> Email Address </label>
                    <input type="email" className="form-control" id="email"/>
                  </div>

                  <div className="form-group">
                    <label> Student ID </label>
                    <input type="text" className="form-control" id="studentid"/>
                  </div>

                  <div className="form-group">
                    <label> Cal1 Card ID </label>
                    <input type="text" className="form-control" id="cal1cardid"/>
                  </div>

                  <button className="btn btn-primary"> Sign Up </button>
                  <br/>
                  <small> Registered? Log in <Link to="/"> here </Link> </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
