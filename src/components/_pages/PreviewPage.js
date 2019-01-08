import React from 'react';
import Webcam from "react-webcam";
import CaptureButton from '../buttons/CaptureButton';
import Countdown from '../countdown/Countdown';
import axios from 'axios';
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';

class PreviewPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startCountdown: false,
            requestIsSend: false,
        };
    }

    componentDidMount = () => {
        if (!this.props.location.state || !this.props.location.state.album) 
        {
            // this.props.history.push('/album')
        }
    }
    
    takePicture = async () => {
        this.setState({ requestIsSend: true });

        // const resp      = await axios.get(`${process.env.REACT_APP_SERVER_URL}/takePicture`);
        // const picture   = resp.data.image;

        const picture   = 'https://bit.ly/2VzPl0Q';

        if (picture !== null)
        {
            this.setState({ requestIsSend: false });
        }

        this.props.history.push('/review', { picture, album: this.props.location.state.album });
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    };

    renderCountDown = () => {
        if (this.state.startCountdown) return <Countdown onDone={ this.takePicture }/>
    }
    
    render = () => {
        console.log(this.state.requestIsSend);
        return (
            <div className='PreviewPage'>
                <Webcam 
                    width='100%'
                    height='100%'
                    audio={ false }
                    ref={ this.setRef }
                />

                { this.renderCountDown() }

                <SyncLoader
                    color='#fff'
                    size={ 50 }
                    loading={ this.state.requestIsSend }
                />

                <CaptureButton onClick={ (e) => this.setState({ startCountdown: true }) }/>
            </div>
        )
    }
}

export default PreviewPage;