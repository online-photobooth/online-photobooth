import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { css } from 'emotion';
import { colorS } from '../../assets/variables';
import CountdownButton from '../countdown/CountdownButton';
import { checkRefresh } from '../services/refreshLogin';
import Heading from '../titles/Heading';

class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      timer: 3,
    };
  }

  componentDidMount = () => {
    const { album, history } = this.props;

    if (!album) {
      history.push('/album');
    }

    checkRefresh();
  }

  takePicture = async () => {
    const { history, frame } = this.props;

    this.setState({ loading: true });

    const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/takePicture`, { frame });
    const picture = resp.data.image;

    if (picture !== null) {
      this.setState({ loading: false });
    }

    history.push('/review', { picture });
  }

  takeGif = async () => {
    const { history, frame } = this.props;

    this.setState({ loading: true });

    try {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/takeGif`);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });

      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/createGif`, {
        frame,
      });
    } catch (error) {
      console.log(error);
    }

    await this.setState({ loading: false });

    history.push('/review');
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  render = () => {
    const { loading, timer } = this.state;
    const { format, frame } = this.props;

    return (
      <div className="PreviewPage">
        <div
          className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        `}
        >
          <div
            className={css`
        position: absolute;
        z-index: 3;
        top: 15vh;
        `}>
            <Heading
              type="heading--3"
            >
              Ready. Set.
            </Heading>
            {!loading && (
              <CountdownButton
                onDone={format === 'gif' ? this.takeGif : this.takePicture}
                timer={timer || 3}
                text="Go!"
                size="large"
              />
            )}
          </div>
          <Webcam
            height="70%"
            audio={false}
            ref={this.setRef}
            className={css`position: 'absolute'`}
          />
          <img
            src={`/images/frames/${frame}`}
            alt="Frame"
            className={css`
          position: absolute; 
          height: 70%;
          width: auto;
          `}
          />
        </div>

        <SyncLoader
          color={colorS}
          size={50}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  album: state.album,
  format: state.format,
  frame: state.frame,
});

export default connect(mapStateToProps)(PreviewPage);
