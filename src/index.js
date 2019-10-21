import React, { Component, createRef, useEffect, useState } from "react";
import "./app.css";
import {
  delay,
  getViewPort,
  contentInView,
  getSVGPosition,
  getPercentLevel,
  getCircumference,
  getTrackPathRadius,
  getTrackPathBorderElementRadius,
  getColorType
} from "./utils";

class ProgressBar extends Component {
  state = {
    animate: false,
    counter: 0
  };
  myRef = createRef();
  trackRef = createRef();

  animateCount = async () => {
    this.setState({
      counter: 0
    });
    await delay(500);
    console.log('running')
    while (this.state.counter < Number(this.props.percentage)) {
      await delay(1000 / Number(this.props.percentage));
      this.setState(prevState => ({
        ...prevState,
        counter: prevState.counter + 1
      }));
    }
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      if (!this.state.animate && contentInView(this.myRef.current)) {
        this.animateCount();
        this.setState({
          animate: true
        });
        this.trackRef.current.style.setProperty(
          "--level",
          getPercentLevel(this.props.radius, this.props.percentage)
        );
      }
    });
  }

  render() {
    const {
      percentage,
      radius,
      trackWidth,
      trackPathColor,
      percentColor,
      trackBorderColor,
      defColor,
      bgColor
    } = this.props;
    return (
      <div ref={this.myRef} className="progress-bar">
        <h2
          className="progress-bar-percent"
          style={{
            fontSize: `${(radius && (radius * 3) / 100) || "3"}em`,
            color: percentColor
          }}
        >
          {this.state.counter}%
        </h2>
        <svg
          height={`${(radius && getViewPort(radius)) || "250"}`}
          width={`${(radius && getViewPort(radius)) || "250"}`}
        >
          <circle
            className="progress-bar-trackPath-background"
            ref={this.trackRef}
            cx={`${(radius && getSVGPosition(radius)) || "125"}`}
            cy={`${(radius && getSVGPosition(radius)) || "125"}`}
            r={`${(radius && getTrackPathRadius(radius, trackWidth)) || "100"}`}
            stroke={trackPathColor || "rgba(158, 158, 158, 0.322)"}
            strokeWidth={`${Number(trackWidth) || 10}`}
            fill="none"
          />
          <circle
            className={`progress-bar-track ${this.state.animate &&
              "addAnimate"}`}
            ref={this.trackRef}
            cx={`${(radius && getSVGPosition(radius)) || "125"}`}
            cy={`${(radius && getSVGPosition(radius)) || "125"}`}
            r={`${(radius && getTrackPathRadius(radius, trackWidth)) || "100"}`}
            stroke={percentage && getColorType(percentage, defColor)}
            strokeWidth={`${Number(trackWidth) || 10}`}
            fill="none"
            strokeDasharray={`${radius && getCircumference(radius)}`}
            strokeDashoffset={`${radius && getCircumference(radius)}`}
          />
          <circle
            cx={`${(radius && getSVGPosition(radius)) || "125"}`}
            cy={`${(radius && getSVGPosition(radius)) || "125"}`}
            r={`${Number(radius) || "105"}`}
            stroke={trackBorderColor || "rgba(158, 158, 158, 0.3)"}
            strokeWidth="1"
            fill="none"
          />
          <circle
            className="progress-bar-hollow"
            cx={`${(radius && getSVGPosition(radius)) || "125"}`}
            cy={`${(radius && getSVGPosition(radius)) || "125"}`}
            r={`${(radius &&
              getTrackPathBorderElementRadius(radius, trackWidth)) ||
              "95"}`}
            stroke={trackBorderColor || "rgba(158, 158, 158, 0.3)"}
            strokeWidth="1"
            fill={bgColor || "none"}
          />
        </svg>
      </div>
    );
  }
}

export default ProgressBar;
