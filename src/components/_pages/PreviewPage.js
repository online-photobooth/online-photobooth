import React from 'react';
import Webcam from "react-webcam";
import CaptureButton from '../buttons/CaptureButton';
import Countdown from '../countdown/Countdown';
import axios from 'axios'

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
            return <Countdown onDone={ this.takePicture }/>
        }
        else 
        {
            return null;
        }
    }

    takePicture = () => {
        axios.get('http://10.6.101.1:8888/takePictureWithoutSaving')
            .then((res) => {
                this.props.history.push({
                    pathname: '/review',
                    state: { picture: res.data.image }
                });
            })
            .catch((err) => {
                console.log(err)
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