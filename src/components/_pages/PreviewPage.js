import React from 'react';
import Webcam from "react-webcam";
import CaptureButton from '../buttons/CaptureButton';
import Countdown from '../countdown/Countdown';

class PreviewPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startCountdown: false,
        };
    }
    
    startCounter = () => {
        this.setState({ startCountdown: true });
    }

    renderCountDown = () => {
        if (this.state.startCountdown)
        {
            return (
                <Countdown />
            )
        }
    }
    
    render = () => {
        return (
            <div className='PreviewPage'>
                <Webcam 
                    width='100%'
                    height='100%'
                    audio={ false }
                />

                { this.renderCountDown() }

                <CaptureButton onClick={ this.startCounter }/>
            </div>
        )
    }
}

export default PreviewPage;