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
      date: props.location.state.date,
      lessonName: props.location.state.lessonName,
      lessonNumber: props.location.state.lessonNumber,
      headers: [
        {label: "Entrepreneurial Leadership Attendance", key: "name"},
        {label: "SID #", key: "userId"},
        {label: `${props.location.state.date}`, key: "status"}
      ]

    };
    this.endSession = this.endSession.bind(this);
  }

  // componentWillMount(){
  //   // const { lessonName } = this.props.location.state;
  //   const currentLessonNumber = this.state.lessonNumber[this.state.lessonName];
  //   console.log('this is a test');
  //   console.log(this.state.lessonName);
  //   console.log(currentLessonNumber);
  //   this.setState({ currentLessonNumber: currentLessonNumber });
  //   console.log(this.state.currentLessonNumber);
  //   console.log('this is the end');
  //
  // }

  endSession(){
    console.log('session has ended');

    // aggregate the data
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://attendy-geofi.herokuapp.com/attendance/aggregate?lessonName=class%${this.state.lessonNumber}\n`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          var tdata = JSON.parse(result);
          this.setState({data: tdata.csvFormat});
          console.log(this.state.data)
        })
        .catch(error => console.log('error', error));

    this.setState({ showWebcam: false});
    this.setState({ showEndSession: false});
    this.setState({ showCSV: true});

    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch(`https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%${this.state.lessonNumber}&status=finished`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));

  }

  render(){
    var showWebcam = this.state.showWebcam ? <Webcamcom lessonNumber={this.state.lessonNumber} lessonName={this.state.lessonName}/> : '';
    var showEndSessionBtn = this.state.showEndSession ?
      <div className="row">
        <div className="col btn-center">
          <button className="btn btn-primary btn-lg" onClick={this.endSession}> End Session </button>
        </div>
      </div> : '';

    var showCSVBtn = this.state.showCSV ?
        <div className="row">
          <div className="col btn-center">
            <h3> The Session has ended </h3>
            <h5> The attandance sheet is available for download below. </h5>
            <br/>
            {this.state.data.length ? <CSVLink data={this.state.data} headers={this.state.headers} className="btn btn-primary" filename={`attendance_sheet_${this.state.date}.csv`}>Download Attendance List</CSVLink> : null}
          </div>
        </div> : '';

    return(
      <div>
        <Navbar/>
        <div className="btn-center">
          <h1> { this.state.date } </h1>
        </div>
        { showWebcam }
        <br/>
        { showEndSessionBtn }
        { showCSVBtn }
      </div>
    );
  }
}

export default Webcamframe;
