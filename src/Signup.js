import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import { Link, withRouter } from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);

    this.state = {
      username:'',
      password:'',
      email:'',
      userId:'',
      berkeleyId:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event){
    event.preventDefault();
    console.log(this.state);

    // call login api
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name":this.state.username,
                              "email":this.state.email,
                              "password":this.state.password,
                              "userId":this.state.userId,
                              "berkeleyId":this.state.berkeleyId});
    console.log(this.state);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://attendy-geofi.herokuapp.com/signup", requestOptions)
      .then(response => response.text())
      .then(result => { console.log(result) })
      .catch(error => {
        console.log('error', error);
      });
    this.props.history.push("/")
  }

  render(){
    const { username, password, userId, berkeleyId } = this.state;
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
                    <input type="username" className="form-control" name="username" onChange={this.onChange}/>
                  </div>

                  <div className="form-group">
                    <label> Password </label>
                    <input type="password" className="form-control" name="password" onChange={this.onChange}/>
                  </div>

                  <div className="form-group">
                    <label> Confirm Password </label>
                    <input type="password" className="form-control" name="password2"/>
                  </div>

                  <div className="form-group">
                    <label> Email Address </label>
                    <input type="email" className="form-control" name="email" onChange={this.onChange}/>
                  </div>

                  <div className="form-group">
                    <label> Student ID </label>
                    <input type="text" className="form-control" name="userId" onChange={this.onChange}/>
                  </div>

                  <div className="form-group">
                    <label> Cal1 Card ID </label>
                    <input type="text" className="form-control" name="berkeleyId" onChange={this.onChange}/>
                  </div>

                  <button className="btn btn-primary" onClick={this.onSubmit}> Sign Up </button>
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

export default withRouter(Signup);
