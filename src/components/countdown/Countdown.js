import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Countdown extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            timer: 3,
            hideTimer: false
        };
    }

    componentDidMount = () => {
        this.interval   = setInterval(() => {
            if (this.state.timer !== 0)
            {
                this.setState({ timer: this.state.timer - 1 });
            }
            else 
            {
                this.setState({ timer: 0, hideTimer: true });
            }
        }, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }
    
    render = () => {
        return (
            <div className='Countdown'>
                <div className="flash_screen"></div>
                { (this.state.hideTimer) ? '' : <h1>{ this.state.timer }</h1> }
            </div>
        )
    }
}

export default Countdown;