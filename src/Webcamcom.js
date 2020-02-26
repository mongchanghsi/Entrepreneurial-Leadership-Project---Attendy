import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';

class Webcamcom extends Component {

  constructor(props){
    super(props);

    this.state = {
      lessonName: this.props.lessonName,
      lessonNumber: this.props.lessonNumber
    };
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
      const { data: { text, lines } } = await worker.recognize(img.src);
      console.log(text);
      console.log(lines);
      var txtName = new Array();
      var txtID = new Array();
      for ( var i = 0; i < lines.length; i++ ) {
        let remS = lines[i].text.toString().replace(/[^\w\s]/gi, "");
        let remSpace = remS.replace(/(\r\n|\n|\r)/gm, "");
        if ( remSpace.match(/[a-zA-Z]+/g) ) {
          let remNum = remSpace.replace(/[0-9]/g, "");
          if (remNum.length > 7) {
            if (remNum.match(/ext/gm)) {
              console.log(remNum)
            } else {
              txtName.push(remNum)
              console.log(remNum)
            }
          } else {
            document.getElementById("ocr_status").innerText = "Error";
            document.getElementById("ocr_results").innerText = "Unable to read result, please try again";
          }
        }

        if ( lines[i].text.match(/303/g) ) {
          let remWord = remSpace.replace(/[a-zA-Z]/g, "");
          if (remWord.match(/^(303)([0-9]{7})$/g)) {
            txtID.push(remWord)
            console.log(remWord)
          } else {
            document.getElementById("ocr_status").innerText = "Error";
            document.getElementById("ocr_results").innerText = "Unable to read result, please try again";
          }
        }
      }

      let cTxt = txtName + txtID;

      document.getElementById("ocr_results").innerText = cTxt;
      document.getElementById("ocr_status").innerText = 'Completed';
      await worker.terminate();

      if(txtID.length == 0){
        document.getElementById("ocr_status").innerText = "Error";
        document.getElementById("ocr_results").innerText = "Unable to read result, please try again";
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({    "userName": txtName,
                                    "berkeleyId": txtID,
                                    "subjectName": "Entrepreneurial Leadership",
                                    "lessonName": `${this.state.lessonName}`});

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

    fetch(`https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%${this.state.lessonNumber}&status=punctual`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log('successfully start the attendance');
        document.getElementById("attendance_status").innerText = "Status: Punctual"
      })
      .catch(error => console.log('error', error));
  }

  // changing the class status to late, so that the subsequent entry are considered late
  changeLate(){
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };

      fetch(`https://attendy-geofi.herokuapp.com/lesson/status?subjectName=Entrepreneurial%20Leadership&lessonName=class%${this.state.lessonNumber}&status=late`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          document.getElementById("attendance_status").innerText = "Status: Late"
        })
        .catch(error => console.log('error', error));
  }

  // checking the status of the class - not using
  checkStatus(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://attendy-geofi.herokuapp.com/lesson/search?name=${this.state.lessonName}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render(){
    // identify which class is this currently running at
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
              height={250}
              width={400}
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
