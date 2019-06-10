import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { css } from 'emotion';
import { colorS } from '../../assets/variables';
import CountdownButton from '../countdown/CountdownButton';
import { checkRefresh } from '../services/refreshLogin';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      timer: 3,
    };
  }

  componentDidMount = async () => {
    const { album, history } = this.props;

    if (!album) {
      history.push('/album');
    }

    try {
      await checkRefresh();
    } catch (error) {
      history.push('/login');
    }
  }

  takePicture = async () => {
    const { history, frame, filter } = this.props;

    this.setState({ loading: true });

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/takePicture`, { frame, filter });
      this.setState({ loading: false });

      history.push('/review');
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }

  takeGif = async () => {
    const { history, frame, filter } = this.props;

    this.setState({ loading: true });

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/takeGif`, {
        filter,
      });
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
    const { format, frame, history } = this.props;

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
            height="800"
            width="1200"
            audio={false}
            ref={this.setRef}
            className={css`position: 'absolute'`}
          />
          <img
            src={`/images/frames/${frame}`}
            alt="Frame"
            className={css`
            position: absolute; 
            height: 800px;
            width: 1200px;
          `}
          />
        </div>

        <SyncLoader
          color={colorS}
          size={50}
          loading={loading}
        />

        <RegularButton
          img="home"
          alt="House icon."
          title="Home"
          size="small"
          onClick={() => history.push('/')}
          className={css`
          position: absolute;
          z-index: 3;
          right: 5vh;
          bottom: 5vh;
          `}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  album: state.album,
  format: state.format,
  frame: state.frame,
  filter: state.filter,
});

export default connect(mapStateToProps)(PreviewPage);
