import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { css } from 'emotion';
import { Image } from 'cloudinary-react';
import { colorS } from '../../assets/variables';
import CountdownButton from '../countdown/CountdownButton';
import { checkRefresh } from '../services/refreshLogin';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

const click = new Audio('/sounds/click.mp3');

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

    if (!album.title) {
      history.push('/album');
    }

    try {
      await checkRefresh();
    } catch (error) {
      history.push('/login');
    }
  }

  takePicture = async () => {
    const {
      history, frame, filter, cameraServer, ffmpegServer,
    } = this.props;

    this.setState({ loading: true });

    if (cameraServer === 'webcam') {
      const image = await this.takePictureWithWebcam(this.webcam);

      try {
        await axios.post(`${ffmpegServer}/takePicture`, { frame, filter, image });
        this.setState({ loading: false });

        history.push('/review');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(`${cameraServer}/takePicture`, { frame, filter });
        this.setState({ loading: false });

        history.push('/review');
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ loading: false });
  }

  takeGif = async () => {
    const {
      history, frame, filter, cameraServer, ffmpegServer,
    } = this.props;

    this.setState({ loading: true });

    if (cameraServer === 'webcam') {
      const images = await this.takeGifWithWebcam(this.webcam);
      try {
        await axios.post(`${ffmpegServer}/createGif`, {
          frame,
          filter,
          images,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(`${cameraServer}/takeGif`, {
          filter,
        });
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }

      try {
        await axios.post(`${ffmpegServer}/createGif`, {
          frame,
        });
      } catch (error) {
        console.log(error);
      }
    }

    await this.setState({ loading: false });

    history.push('/review');
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  takePictureWithWebcam = webcam => new Promise(resolve => setTimeout(() => {
    click.play();
    resolve(webcam.getScreenshot());
  }, 1000));

  takeGifWithWebcam = async (webcam) => {
    const imageSrc = [];

    imageSrc.push(await this.takePictureWithWebcam(webcam));
    imageSrc.push(await this.takePictureWithWebcam(webcam));
    imageSrc.push(await this.takePictureWithWebcam(webcam));
    imageSrc.push(await this.takePictureWithWebcam(webcam));

    return imageSrc;
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
          {
            frame && (
              <Image
                cloudName="perjor"
                publicId={frame}
                width="1200"
                height="800"
                crop="scale"
                className={css`
          position: absolute; 
          height: 800px;
          width: 1200px;
        `}
              />
            )
          }
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
  cameraServer: state.settings.camera,
  ffmpegServer: state.settings.ffmpeg,
  canvasServer: state.settings.canvas,
});

export default connect(mapStateToProps)(PreviewPage);
