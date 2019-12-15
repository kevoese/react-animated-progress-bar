import React, { Component, createRef } from 'react';
import './app.css';
import {
  delay,
  contentInView,
  getPercentLevel,
  getRadius,
  propTypeValidation,
  makeCancelable,
  sanitizePercentage,
} from './utils';
import CircularProgressBar from './Components/CircularProgressBar';
import RectProgressBar from './Components/RectProgressBar';
class ProgressBar extends Component {
  state = {
    animate: false,
    counter: 0,
    responsiveRadius: 0,
    scrollAreaIsSet: null,
    stepDelay: null,
    countDelay: null,
  };

  myRef = createRef();
  rectTrackRef = createRef();
  trackRef = createRef();
  scrollRef = createRef();

  animateCount = async () => {
    try {
      this.setState({
        counter: 0,
      });
      const percentage = sanitizePercentage(this.props.percentage);
      const stepDelay = new delay(500);
      const countDelay = new delay(1000 / percentage);
      this.setState({
        stepDelay,
        countDelay,
      });
      await stepDelay.getPromise();

      while (this.state.counter < percentage) {
        await countDelay.getPromise();
        this.setState(prevState => ({
          ...prevState,
          counter: prevState.counter + 1,
        }));
      }
    } catch (error) {}
  };

  animateOnScroll = () => {
    if (!this.state.animate && contentInView(this.myRef.current)) {
      this.scrollRef.current.removeEventListener(
        'scroll',
        this.animateOnScroll
      );
      this.animateCount();
      this.setState({
        animate: true,
      });
      !this.props.rect
        ? this.trackRef.current.style.setProperty(
            '--level',
            getPercentLevel(this.props.percentage)
          )
        : this.rectTrackRef.current.style.setProperty(
            '--rectLevel',
            `${sanitizePercentage(this.props.percentage)}%`
          );
    }
  };

  componentDidMount() {
    this.animateOnScroll();
    this.setState({ scrollAreaIsSet: false });
  }

  componentDidUpdate() {
    if (!this.state.scrollAreaIsSet) {
      this.setState({ scrollAreaIsSet: true });
      this.scrollRef.current =
        this.props.scrollArea && typeof this.props.scrollArea == 'object'
          ? this.props.scrollArea
          : document;
      this.scrollRef.current.addEventListener('scroll', this.animateOnScroll);
    }
  }

  componentWillUnmount() {
    // unsubscribe from timeouts and delay
    this.scrollRef.current.removeEventListener('scroll', this.animateOnScroll);
    this.state.stepDelay && this.state.stepDelay.cancel();
    this.state.countDelay && this.state.countDelay.cancel();
  }

  render() {
    const { width, rect } = this.props;
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
