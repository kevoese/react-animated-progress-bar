import React, { Component, createRef, useEffect, useState } from "react";
import "./app.css";

class ProgressBar extends Component {
  // let checkDiv = document.querySelector(".myPackage");
  // let circleObj = document.querySelector(".circleObj");
  // let countP = document.querySelector(".countme");
  // constructor(props) {
  //   this.myRef = createRef();
  // }
  state = {
    animate: true,
    counter: 0
  };
  myRef = createRef();
  trackRef = createRef();
  colorType = percent => {
    const res =
      (percent < 25 && " #F32013") ||
      (percent < 50 && "#ff6700") ||
      (percent < 70 && "rgb(255, 217, 0)") ||
      "#48AE2C";
    return res;
  };

  animateCount = async () => {
    this.setState({
      counter: 0
    });
    const delay = time =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    await delay(1000);
    while (this.state.counter < Number(this.props.percentage)) {
      await delay(1000 / Number(this.props.percentage));
      this.setState(prevState => ({
        ...prevState,
        counter: prevState.counter + 1
      }));
    }
  };

  inView = element => {
    const scroll = window.scrollY || window.pageYOffset;
    const elementPositionProps = element.getBoundingClientRect();
    const elementTopPosition = elementPositionProps.top + scroll;

    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight
    };

    const elementPosition = {
      top: elementTopPosition,
      bottom: elementTopPosition + elementPositionProps.height
    };
    return (
      (elementPosition.bottom >= viewport.top &&
        elementPosition.bottom <= viewport.bottom) ||
      (elementPosition.top <= viewport.bottom &&
        elementPosition.top >= viewport.top)
    );
  };

  componentDidMount() {
    if (this.inView(this.myRef.current)) {
      console.log("here");
      this.setState({
        animate: true
      });
      let c = 2 * 3.14 * this.props.radius;
      let level = c - (this.props.percentage * c) / 100;
      console.log("level", level, c);
      this.trackRef.current.style.setProperty("--level", level);
      this.animateCount();
      console.log("running");
    } else {
      this.setState({
        animate: true
      });
    }
  }

  render() {
    const { percentage, radius, trackWidth, percentColor } = this.props;
    return (
      <div ref={this.myRef} className="progress-bar">
        <h2
          className="progress-bar-percent"
          style={{ fontSize: `${(radius && (radius * 3) / 100) || "3"}em` , color: percentColor}}
        >
          {this.state.counter}%
        </h2>
        <svg
          height={`${(radius && (Number(radius) + 20) * 2) || "250"}`}
          width={`${(radius && (Number(radius) + 20) * 2) || "250"}`}
        >
          <circle
            className={`progress-bar-track-background ${this.state.animate &&
              "addAnimate"}`}
            ref={this.trackRef}
            cx={`${(radius && Number(radius) + 20) || "125"}`}
            cy={`${(radius && Number(radius) + 20) || "125"}`}
            r={`${(radius && Number(radius) - Number(trackWidth) / 2) ||
              "100"}`}
            stroke="rgba(158, 158, 158, 0.322)"
            strokeWidth={`${Number(trackWidth) || 10}`}
            fill="none"
          />
          <circle
            className={`progress-bar-track ${this.state.animate &&
              "addAnimate"}`}
            ref={this.trackRef}
            cx={`${(radius && Number(radius) + 20) || "125"}`}
            cy={`${(radius && Number(radius) + 20) || "125"}`}
            r={`${(radius && Number(radius) - Number(trackWidth) / 2) ||
              "100"}`}
            stroke={percentage && this.colorType(percentage)}
            strokeWidth={`${Number(trackWidth) || 10}`}
            fill="none"
            strokeDasharray={`${radius && 2 * 3.142 * Number(radius)}`}
            strokeDashoffset={`${radius && 2 * 3.142 * Number(radius)}`}
          />
          <circle
            className="circleOut"
            cx={`${(radius && Number(radius) + 20) || "125"}`}
            cy={`${(radius && Number(radius) + 20) || "125"}`}
            r={`${Number(radius) || "105"}`}
            stroke="rgba(158, 158, 158, 0.3)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            className="progress-bar-hollow"
            cx={`${(radius && Number(radius) + 20) || "125"}`}
            cy={`${(radius && Number(radius) + 20) || "125"}`}
            r={`${(radius && Number(radius) - Number(trackWidth)) || "95"}`}
            stroke="rgba(158, 158, 158, 0.3)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    );
  }
}

export default ProgressBar;
