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
      timer: 1,
      totalPictures: 4,
      pictures: [],
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

    history.push('/review', { picture, album: location.state.album, option: 'single' });
  }

  takeGif = async () => {
    const { location, history } = this.props;
    const { totalPictures, pictures } = this.state;

    this.setState({ requestIsSend: true });

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/createGif`, {
      frame: 2,
    });
    this.setState({ requestIsSend: false });

    history.push('/review', { pictures, album: location.state.album, option: 'gif' });

    const resp = await axios.get(`${process.env.REACT_APP_SERVER_URL}/takePicture`);
    this.setState({ pictures: [...pictures, resp.data.image] });

    this.setState({ totalPictures: totalPictures - 1 });

    console.log('TCL: PreviewPage -> takeGif -> totalPictures', totalPictures);

    if (totalPictures === 0) {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/createGif`);
      this.setState({ requestIsSend: false });

      history.push('/review', { pictures, album: location.state.album, option: 'gif' });
    } else {
      this.setState({ startCountdown: false });
      this.setState({ startCountdown: true });
    }

    this.setState({ requestIsSend: false });
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  renderCountDown = (option, timer) => {
    const { startCountdown } = this.state;

    if (startCountdown) return <Countdown onDone={option === 'gif' ? this.takeGif : this.takePicture} timer={timer} />;

    return true;
  }

  render = () => {
    const { requestIsSend, timer } = this.state;
    const { location } = this.props;

    return (
      <div className="PreviewPage">
        <Webcam
          width="100%"
          height="100%"
          audio={false}
          ref={this.setRef}
        />

        { this.renderCountDown(location.state.option, timer) }

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
