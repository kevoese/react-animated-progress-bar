import React from "react";
import {
  getColorType, getNumber
} from "../../utils";

const CircularProgressBar = ({
  percentage,
  radius,
  trackWidth,
  trackPathColor,
  fontColor,
  trackBorderColor,
  defColor,
  hollowBackgroundColor,
  trackRef,
  animate,
  counter
}) => {
  const strokeWidth = !isNaN(Number(getNumber(trackWidth))) && getNumber(trackWidth) * 0.4 || 4;

  return (
    <div className="progress-bar-circ-container">
      <h2
        className="progress-bar-percent"
        style={{
          fontSize: `${radius * 0.2 }px`,
          color: fontColor
        }}
      >
        {counter}%
      </h2>
      <svg
        height={`${radius || "183"}`}
        width={`${radius || "183"}`}
      >
        <circle
          className="progress-bar-trackPath-background"
          ref={trackRef}
          cx="50%"
          cy="50%"
          r="40%"
          stroke={trackPathColor || "rgba(158, 158, 158, 0.322)"}
          strokeWidth={strokeWidth + '%'}
          fill="none"
        />
        <circle
          className={`progress-bar-track ${animate && "addAnimate"}`}
          ref={trackRef}
          cx="50%"
          cy="50%"
          r="40%"
          stroke={percentage && getColorType(percentage, defColor)}
          strokeWidth={strokeWidth + '%'}
          fill="none"
          strokeDasharray="252%"
          strokeDashoffset="252%"
        />
        <circle
          cx="50%"
          cy="50%"
          r={`${40 + strokeWidth / 2}%` || "42%"}
          stroke={trackBorderColor || "rgba(158, 158, 158, 0.3)"}
          strokeWidth="1"
          fill="none"
        />
        <circle
          className="progress-bar-hollow"
          cx="50%"
          cy="50%"
          r={`${40 - strokeWidth / 2}%` || "38%"}
          stroke={trackBorderColor || "rgba(158, 158, 158, 0.3)"}
          strokeWidth="1"
          fill={hollowBackgroundColor || "none"}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
