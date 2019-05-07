import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import Countdown from '../countdown/Countdown';
import CaptureButton from '../buttons/CaptureButton';

class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCountdown: false,
      requestIsSend: false,
    };
  }

  componentDidMount = () => {
    const { location } = this.props;

    if (!location.state || !location.state.album) {
      // this.props.history.push('/album')
    }
  }

  takePicture = async () => {
    const { location, history } = this.props;

    this.setState({ requestIsSend: true });

    const resp = await axios.get(`${process.env.REACT_APP_SERVER_URL}/takePicture`);
    const picture = resp.data.image;

    // const picture   = 'https://bit.ly/2VzPl0Q';

    if (picture !== null) {
      this.setState({ requestIsSend: false });
    }

    history.push('/review', { picture, album: location.state.album });
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  renderCountDown = () => {
    const { startCountdown } = this.state;

    if (startCountdown) return <Countdown onDone={this.takePicture} />;

    return true;
  }

  render = () => {
    const { requestIsSend } = this.state;

    console.log(requestIsSend);
    return (
      <div className="PreviewPage">
        <Webcam
          width="100%"
          height="100%"
          audio={false}
          ref={this.setRef}
        />

        { this.renderCountDown() }

        <SyncLoader
          color="#fff"
          size={50}
          loading={requestIsSend}
        />

        <CaptureButton onClick={() => this.setState({ startCountdown: true })} />
      </div>
    );
  }
}

export default PreviewPage;
