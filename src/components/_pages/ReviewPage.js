import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { css } from 'emotion';
import BaseLoader from '../loaders/BaseLoader';
import RegularButton from '../buttons/RegularButton';
import { checkRefresh } from '../services/refreshLogin';

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: false,
      loading: false,
    };
  }

  componentDidMount = () => {
    const {
      history, format, album,
    } = this.props;

    if (!album) {
      history.push('/album');
    }

    if (format !== 'single') {
      this.setState({ gif: true });
    }
  }

  uploadPicture = async () => {
    await checkRefresh();

    const {
      history, accessToken, album, format, ffmpegServer,
    } = this.props;

    this.setState({ loading: true });


    const formatUrl = format === 'single' ? 'uploadLastImageTaken' : 'uploadLastGifTaken';

    try {
      const resp = await axios.post(`${ffmpegServer}/${formatUrl}`, {
        token: accessToken,
        album: album.id,
      });

      console.log(resp);

      if (resp.status === 200) {
        history.push('/final');
      } else {
        console.log(resp);
      }
    } catch (error) {
      if (error.response.status === 401) {
        try {
          await checkRefresh();
        } catch (refreshError) {
          console.log(refreshError);
        }
      } else {
        console.log(error);
      }
    }
    this.setState({ loading: false });
  }

  render = () => {
    const { gif, loading } = this.state;
    const { history, ffmpegServer } = this.props;

    const imagePath = (history.location.state && history.location.state.image) || `${ffmpegServer}/images/picture.jpg?t=${new Date()}`;
    const videoPath = `${ffmpegServer}/videos/video.mp4?t=${new Date()}`;

    return (
      <div>
        <BaseLoader
          loading={loading}
        />

        <div className={css`
          display: flex;
          max-width: 100vw;
          width: 100vw;
          height: 100vh;
          justify-content: flex-end;
          align-items: center;
        `}
        >
          <div className={css`
            width: 70vw;
            `}
          >
            {!gif && (
              <img
                src={imagePath}
                alt="Taken by our photobooth."
                className={css`
              max-width: 100%;
              height: auto;
              max-height: 100%;`}
              />
            )}
            {gif && (
              <video
                autoPlay
                playsInline
                loop
                id="gif"
                className={css`
                max-width: 100%;
                `}
              >
                <source src={videoPath} type="video/mp4" />
              </video>
            )}
          </div>
          <div className={css`
              width: 20vw;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <RegularButton
              size="small"
              img="heart"
              title="Keep"
              onClick={this.uploadPicture}
              className={css`margin-bottom: 100px;`}
            />
            <RegularButton
              size="small"
              img="refresh"
              title="Redo"
              onClick={history.goBack}
              className={css`margin-bottom: 100px;`}
            />
            <RegularButton
              img="home"
              alt="House icon."
              title="Home"
              size="small"
              onClick={() => history.push('/')}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  format: state.format,
  album: state.album,
  cameraServer: state.settings.camera,
  ffmpegServer: state.settings.ffmpeg,
});

export default connect(mapStateToProps)(ReviewPage);
