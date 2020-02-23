import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Tapage1 from './tapage1';

class Card extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render(){
    return(
      <div>
        <div className="card card-size">
          <div className="card-body">
            <h5 className="card-title"> Log In </h5>
            <form>
              <div className="form-group">
                <label> Username </label>
                <input type="username" className="form-control" id="username"/>
              </div>

              <div className="form-group">
                <label> Password </label>
                <input type="password" className="form-control" id="password"/>
              </div>

              <Link to="/Tapage1"><button className="btn btn-primary"> Log in </button></Link>
              <br/>
              <small> New user? Sign up <Link to="/Signup"> here </Link> | Forget password? Reset <Link to="/"> here </Link> </small>
            </form>


          </div>
        </div>
      </div>
    );
  }
}

export default Card;
