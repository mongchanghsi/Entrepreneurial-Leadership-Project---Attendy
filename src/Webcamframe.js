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
      headers: [
        {label: "Name", key: "name"},
        {label: "Student ID", key: "userId"},
        {label: "Status", key: "status"}
      ],
      lessonNumber: {
        "class 1": "201",
        "class 2": "202",
        "class 3": "203",
        "class 4": "204",
        "class 5": "205"
      },
      currentLessonNumber: ''
    };
    this.endSession = this.endSession.bind(this);
  }

  componentDidMount(){
    const { lessonName } = this.props.location.state;
    const currentLessonNumber = this.state.lessonNumber[lessonName]
    this.setState({ currentLessonNumber: currentLessonNumber })
    console.log('this is from the webcamframe');
    console.log(this.state.lessonNumber[lessonName])
    console.log(this.state.currentLessonNumber);
    console.log('end of the webcamframe')
  }

  endSession(){
    console.log('session has ended');

    // aggregate the data
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://attendy-geofi.herokuapp.com/attendance/aggregate?lessonName=class%${this.state.currentLessonNumber}\n`, requestOptions)
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

    fetch(`https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%${this.state.currentLessonNumber}&status=finished`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));

  }

  render(){
    const { date } = this.props.location.state
    const { lessonName } = this.props.location.state
    const { currentLessonNumber } = this.state.currentLessonNumber

    var showWebcam = this.state.showWebcam ? <Webcamcom currentLessonNumber={currentLessonNumber} lessonName={lessonName}/> : '';
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
            {this.state.data.length ? <CSVLink data={this.state.data} headers={this.state.headers} className="btn btn-primary" filename={`attendance_sheet_${date}.csv`}>Download Attendance List</CSVLink> : null}
          </div>
        </div> : '';

    return(
      <div>
        <Navbar/>
        <div className="btn-center">
          <h1> { date } </h1>
          { console.log(this.state.currentLessonNumber)}
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
