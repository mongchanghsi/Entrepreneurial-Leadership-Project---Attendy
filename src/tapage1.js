import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link, withRouter } from 'react-router-dom';
import Webcamframe from './Webcamframe';

class Tapage1 extends Component {
  render(){
    return(
      <div>
        <Navbar/>
        <br/>
        <h2 className="btn-center"> Entrepreneurial Leadership Class</h2>
        <br/>
        <div id="row-one">
          <div className="row">
            <div className="col-1">
            </div>

            <div className="col-4">
              <button className="btn btn-primary btn-lg btn-block btn-disabled" disabled> 24th January 2020 </button>
            </div>

            <div className="col-2">
            </div>

            <div className="col-4">
              <button className="btn btn-primary btn-lg btn-block" disabled> 31st January 2020 </button>
            </div>

            <div className="col-1">
            </div>

          </div>
        </div>
        <br/>
        <div id="row-two">
          <div className="row">
            <div className="col-1">
            </div>

            <div className="col-4">
              <button className="btn btn-primary btn-lg btn-block" disabled> 7th February 2020 </button>
            </div>

            <div className="col-2">
            </div>

            <div className="col-4">
              <button className="btn btn-primary btn-lg btn-block" disabled> 14th February 2020 </button>
            </div>

            <div className="col-1">
            </div>

          </div>
        </div>
        <br/>
        <div id="row-three">
          <div className="row">
            <div className="col-1">
            </div>

            <div className="col-4">
              <button className="btn btn-primary btn-lg btn-block" disabled> 21st February 2020 </button>
            </div>

            <div className="col-2">
            </div>

            <div className="col-4">
              <Link to={{
                pathname: '/Webcamframe',
                state: { date: '28th February 2020', lessonName:"class 1", lessonNumber: "201"}
              }}><button className="btn btn-primary btn-lg btn-block" id="class1"> 28th February 2020 </button></Link>
            </div>

            <div className="col-1">
            </div>

          </div>
        </div>
        <br/>
        <div id="row-four">
          <div className="row">
            <div className="col-1">
            </div>

            <div className="col-4">
              <Link to={{
                pathname: '/Webcamframe',
                state: { date: '6th March 2020', lessonName:"class 2", lessonNumber: "202"}
              }}><button className="btn btn-primary btn-lg btn-block" id="class2"> 6th March 2020 </button></Link>
            </div>

            <div className="col-2">
            </div>

            <div className="col-4">
              <Link to={{
                pathname: '/Webcamframe',
                state: { date: '13th March 2020', lessonName:'class 3', lessonNumber: "203"}
              }}><button className="btn btn-primary btn-lg btn-block" id="class3"> 13th March 2020 </button></Link>
            </div>

            <div className="col-1">
            </div>

          </div>
        </div>
        <br/>
        <div id="row-five">
          <div className="row">
            <div className="col-1">
            </div>

            <div className="col-4">
              <Link to={{
                pathname: '/Webcamframe',
                state: { date: '3rd April 2020', lessonName:'class 4', lessonNumber: "204"}
              }}><button className="btn btn-primary btn-lg btn-block" id="class4"> 3rd April 2020 </button></Link>
            </div>

            <div className="col-2">
            </div>

            <div className="col-4">
              <Link to={{
                pathname: '/Webcamframe',
                state: { date: '10th April 2020', lessonName:'class 5', lessonNumber: "205"}
              }}><button className="btn btn-primary btn-lg btn-block" id="class5"> 10th April 2020 </button></Link>
            </div>

            <div className="col-1">
            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default Tapage1;
