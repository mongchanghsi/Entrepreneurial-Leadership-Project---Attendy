import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';

class Webcamcom extends Component {

  constructor(props){
    super(props);

    this.state = {};
    this.capture = this.capture.bind(this);
    this.changeLate = this.changeLate.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture() {
    const imgSrc = this.webcam.getScreenshot();
    const img = document.getElementById('imageele');
    img.src = imgSrc

    const worker = createWorker({
    logger: m => console.log(m)
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(img.src);
      console.log(text);
      document.getElementById("ocr_results").innerText = text;
      document.getElementById("ocr_status").innerText = 'Completed';
      await worker.terminate();

      var text2 = text.split(" ");
      console.log(text2);
      var i;
      var max_string = '';
      for (i=0; i < text2.length; i++){
        if(text2[i].length > max_string.length){
          max_string = text2[i];
        }
      }

      console.log(max_string);

      if(max_string.length < 10){
        document.getElementById("ocr_status").innerText = "Error";
        document.getElementById("ocr_results").innerText = "Unable to read result, please try again";
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({    "userName": "glenn",
                                    "berkeleyId": "3123124124312321",
                                    "subjectName": "Entrepreneurial Leadership",
                                    "lessonName": "class 1"});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      // everytime when clicking the Run OCR, it will post the attendance to the back-end
      fetch("https://attendy-geofi.herokuapp.com/attendance/submission", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          console.log('successfully taken attendance');
        })
        .catch(error => console.log('error', error));

    })();

  };

  // changing the status to active / punctual, so that the subsequent entry are considered punctual
  changeStart(){
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };

    fetch("https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%201&status=punctual", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log('successfully start the attendance');
        document.getElementById("attendance_status").innerText = "Punctual"
      })
      .catch(error => console.log('error', error));
  }

  // changing the class status to late, so that the subsequent entry are considered late
  changeLate(){
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };

      fetch("https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%201&status=late", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          document.getElementById("attendance_status").innerText = "Late"
        })
        .catch(error => console.log('error', error));
  }

  // checking the status of the class - not using
  checkStatus(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://attendy-geofi.herokuapp.com/lesson/search?name=class 1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render(){
    // identify which class is this currently running at
    var lessonName = this.props.lessonName;
    return(
      <div>
        <br/>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-4 btn-center">
            <h2> Video Input </h2>
          </div>
          <div className="col-2">
          </div>
          <div className="col-4 btn-center">
            <h2> Snapshot </h2>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col btn-center">
            <Webcam
              audio={false}
              ref={this.setRef}
              height={500}
              width={800}
              screenshotFormat="image/png"/>
          </div>

          <div className="col btn-center">
            <img id="imageele" src="" className="imgstyle"/>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
          </div>

          <div className="col-4 btn-center">
            <h4> Scanning Status </h4>
          </div>
          <div className="col-2">
          </div>
          <div className="col-4 btn-center">
            <h4> Scanning Output </h4>
          </div>
        </div>

        <div className="row">
          <div className="col btn-center">
            <div id="ocr_status"> </div>
          </div>

          <div className="col btn-center">
            <div id="ocr_results"> </div>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col btn-center">
            <div id="attendance_status"></div>
          </div>
        </div>

        <br/>

        <div className="row">
          <div className="col btn-center">
            <button className="btn btn-primary btn-lg" onClick={this.capture}> Run OCR </button>
          </div>

          <div className="col btn-center">
            <button className="btn btn-primary btn-lg" onClick={this.changeStart}> Start Attendance </button>
          </div>

          <div className="col btn-center">
            <button className="btn btn-primary btn-lg" onClick={this.changeLate}> Late Attendance </button>
          </div>
        </div>

      </div>
    );
  }
}

export default Webcamcom;
