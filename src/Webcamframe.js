import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Webcamcom from './Webcamcom';
import { CSVLink } from "react-csv";

class Webcamframe extends Component {
  constructor(props){
    super(props);

    this.state = {
      showWebcam: true,
      showEndSession: true,
      showCSV: false,
      data: [],
    };
    this.endSession = this.endSession.bind(this);
  }

  endSession(){
    console.log('session has ended');

    // aggregate the data
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://attendy-geofi.herokuapp.com/attendance/aggregate?lessonName=class%201\n", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          var data = JSON.parse(result);
          this.setState({ data: data.csvFormat});
        })
        .catch(error => console.log('error', error));

    this.setState({ showWebcam: false});
    this.setState({ showEndSession: false});
    this.setState({ showCSV: true});

    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch("https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%201&status=finished", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));

  }

  render(){
    var showWebcam = this.state.showWebcam ? <Webcamcom/> : '';
    var showEndSessionBtn = this.state.showEndSession ?
      <div className="row">
        <div className="col btn-center">
          <button className="btn btn-primary btn-lg" onClick={this.endSession}> End Session </button>
        </div>
      </div> : '';

    var mindblow = [
          { name: "glenn", userId: "X12345", status: "punctual" }
        ];

    var mindblow2 = this.state.data

    var showCSVBtn = this.state.showCSV ?
        <div className="row">
          <div className="col btn-center">
            <CSVLink data={this.state.data} className="btn btn-primary" filename={"attendance-file.csv"}> Download Excel </CSVLink>
          </div>
        </div> : '';

    return(
      <div>
        <Navbar/>
        { showWebcam }
        <br/>
        { showEndSessionBtn }
        { showCSVBtn }
      </div>
    );
  }
}

export default Webcamframe;
