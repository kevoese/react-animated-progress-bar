import React from "react";
import { getColorType } from "../../utils";

const RectProgressBar = ({
  percentage,
  trackWidth,
  trackPathColor,
  fontColor,
  trackBorderColor,
  defColor,
  width,
  counter,
  rectTrackRef,
  animate,
  rectBorderRadius,
  trackBorderRadius,
  rectPadding,
  fontSize,
  height
}) => {
  return (
    <div className="progress-bar-rect-wrap-container">
      <div
        className="progress-bar-rect-wrapper"
        style={{
          
          border: `${trackWidth || "1px"} solid ${trackBorderColor}`,
          padding: `${rectPadding}`,
          borderRadius: `${rectBorderRadius}`,
          height: `${height}`
        }}
      >
        <div style={{ backgroundColor: `${trackPathColor}`, height: `100%` }}>
          <div
            ref={rectTrackRef}
            className={`inner-rect-bar ${animate &&
              "addRectAnimate"}`}
            style={{
              width: "0px",
              height: `100%`,
              backgroundColor: getColorType(percentage, defColor),
              borderRadius: `${trackBorderRadius || rectBorderRadius || "0px"}`
            }}
          ></div>
        </div>
      </div>

      <h2
        className="rect-progress-bar-percent"
        style={{
          display: "flex",
          fontSize: `${fontSize || `calc(${height} * 1.6)`}`,
          margin: "1em",
          color: fontColor
        }}
      >
        {counter}%
      </h2>
    </div>
  );
};

export default RectProgressBar;
