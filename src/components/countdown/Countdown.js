import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 3,
      hideTimer: false,
    };
  }

  componentDidMount = () => {
    const { onDone } = this.props;

    this.interval = setInterval(() => {
      const { timer } = this.state;

      if (timer !== 0) {
        this.setState({ timer: timer - 1 });
      } else {
        this.setState({ timer: 0, hideTimer: true });
        clearInterval(this.interval);
        onDone();
      }
    }, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const { hideTimer, timer } = this.state;

    return (
      <div className="Countdown">
        <div className="flash_screen" />
        { (hideTimer) ? '' : <h1>{ timer }</h1> }
      </div>
    );
  }
}

export default Countdown;
