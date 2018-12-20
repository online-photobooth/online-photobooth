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

    setRef = (webcam) => {
        this.webcam = webcam;
    };

    renderCountDown = () => {
        if (this.state.startCountdown)
        {
            return <Countdown onDone={ this.showPicture }/>
        }
        else 
        {
            return null;
        }
    }

    showPicture = () => {
        this.props.history.push({
            pathname: '/review',
            state: { picture: this.webcam.getScreenshot() }
        });
    }
    
    render = () => {
        return (
            <div className='PreviewPage'>
                <Webcam 
                    width='100%'
                    height='100%'
                    audio={ false }
                    ref={ this.setRef }
                />

                { this.renderCountDown() }

                <CaptureButton onClick={ (e) => this.setState({ startCountdown: true }) }/>
            </div>
        )
    }
}

export default PreviewPage;