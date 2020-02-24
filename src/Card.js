import React, { Component } from 'react';
import './App.css';
import { Link, withRouter } from 'react-router-dom';
import Signup from './Signup';
import Tapage1 from './tapage1';

class Card extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      authority: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount(){
  //   fetch("https://attendy-geofi.herokuapp.com/login", {
  //     method: 'POST'
  //   },
  //   body: JSON.stringify({
  //     firstParam: this.state.username,
  //     secondParam: this.state.password
  //   }))
  // }

  onChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }


  onSubmit(event){
    event.preventDefault();
    console.log(this.state);

    // call api
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"userId":"X12345", "password":"password123"});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://attendy-geofi.herokuapp.com/login", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        var data = JSON.parse(result);
        this.setState({ authority: data.authority });
        console.log(this.state)

        if (this.state.authority === "student"){
          // redirect to the student page
          this.props.history.push("/Tapage1")
        } else if (this.state.authority === "faculty"){
          console.log("redirect to the ta page")
        };
      })
      .catch(error => console.log('error', error));
  }

  render(){
    const { username, password } = this.state;
    return(
      <div>
        <div className="card card-size">
          <div className="card-body">
            <h5 className="card-title"> Log In </h5>
            <form>
              <div className="form-group">
                <label> Username </label>
                <input type="username" className="form-control" name="username" onChange={this.onChange}/>
              </div>

              <div className="form-group">
                <label> Password </label>
                <input type="password" className="form-control" name="password" onChange={this.onChange}/>
              </div>

              <button className="btn btn-primary" onClick={this.onSubmit}> Log in </button>
              <br/>
              <small> New user? Sign up <Link to="/Signup"> here </Link> | Forget password? Reset <Link to="/"> here </Link> </small>
            </form>


          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
