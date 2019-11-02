import React, { Component, createRef } from "react";
import "./app.css";
import { delay, contentInView, getPercentLevel, getRadius, propTypeValidation } from "./utils";
import CircularProgressBar from "./Components/CircularProgressBar";
import RectProgressBar from "./Components/RectProgressBar";
class ProgressBar extends Component {
  state = {
    animate: false,
    counter: 0,
    responsiveRadius: 0
  };
  
  myRef = createRef();
  rectTrackRef = createRef();
  trackRef = createRef();

  animateCount = async () => {
    this.setState({
      counter: 0
    });
    await delay(500);
    while (this.state.counter < Number(this.props.percentage)) {
      await delay(1000 / Number(this.props.percentage));
      this.setState(prevState => ({
        ...prevState,
        counter: prevState.counter + 1
      }));
    }
  };

  animateOnScroll = () => {
    if (!this.state.animate && contentInView(this.myRef.current)) {
      this.animateCount();
      this.setState({
        animate: true
      });
      !this.props.rect
        ? this.trackRef.current.style.setProperty(
            "--level",
            getPercentLevel(this.props.percentage)
          )
        : this.rectTrackRef.current.style.setProperty(
            "--rectLevel",
            `${this.props.percentage}%`
          );
    }
  };

  componentDidMount() {
    this.animateOnScroll();
    document.addEventListener("scroll", this.animateOnScroll);
  }

  componentDidUpdate() {
    if (!this.state.scrollAreaIsSet) {
      this.setState({ scrollAreaIsSet: true });
      (this.props.scrollArea && typeof this.props.scrollArea == 'object')
        ? this.props.scrollArea.addEventListener('scroll', this.animateOnScroll)
        : document.addEventListener('scroll', this.animateOnScroll);
    }
  }

  componentWillUnmount() {
    // unsubscribe from timeouts and delay
    (this.props.scrollArea && typeof this.props.scrollArea == 'object')
      ? this.props.scrollArea.removeEventListener(
          'scroll',
          this.animateOnScroll
        )
      : document.removeEventListener('scroll', this.animateOnScroll);
    this.state.stepDelay && this.state.stepDelay.cancel();
    this.state.countDelay && this.state.countDelay.cancel();
  }

  render() {
    const {
      width,
      rect
    } = this.props;
    return (
      <div
        ref={this.myRef}
        className="progress-bar"
        style={{ width: `${width}` }}
      >
        {!rect ? (
          <CircularProgressBar
            {...this.props}
            radius={getRadius(this.props.width)}
            animate={this.state.animate}
            counter={this.state.counter}
            trackRef={this.trackRef}
          />
        ) : (
          <RectProgressBar
            {...this.props}
            rectTrackRef={this.rectTrackRef}
            counter={this.state.counter}
            animate={this.state.animate}
          />
        )}
      </div>
    );
  }
}

ProgressBar.propTypes = propTypeValidation;

export default ProgressBar;
