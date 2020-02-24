import React, { Component } from 'react';
import Navbar from './Navbar';
import './App.css';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';

class Test extends Component {

  constructor(props){
    super(props);

    this.state = {};
    this.capture = this.capture.bind(this);
    this.endSession =  this.endSession.bind(this);
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

    })();

  };

  endSession(){
    console.log("Session Ended");
  }

  render(){
    return(
      <div>
        <Navbar/>
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
            <h4> Status </h4>
          </div>
          <div className="col-2">
          </div>
          <div className="col-4 btn-center">
            <h4> Output </h4>
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

        <div className="row">
          <div className="col btn-center">
            <button className="btn btn-primary btn-lg" onClick={this.capture}> Run OCR </button>
          </div>
        </div>

        <br/>
        
        <div className="row">
          <div className="col btn-center">
            <button className="btn btn-primary btn-lg" onClick={this.endSession}> End Session </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
