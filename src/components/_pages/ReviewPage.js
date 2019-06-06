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
      img: '',
      gif: false,
      loading: false,
    };
  }

  componentDidMount = () => {
    const {
      location, history, format, album,
    } = this.props;

    if (!album) {
      history.push('/album');
    }

    if (format === 'single') {
      this.setState({ img: location.state.picture });
    } else {
      this.setState({ gif: true });
    }
  }

  uploadPicture = async () => {
    const {
      history, accessToken, album, format,
    } = this.props;

    this.setState({ loading: true });

    const formatUrl = format === 'single' ? 'uploadLastImageTaken' : 'uploadLastGifTaken';

    try {
      const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/${formatUrl}`, {
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
    } finally {
      this.setState({ loading: false });
    }
  }

  render = () => {
    const { img, gif, loading } = this.state;
    const { history } = this.props;

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
            {img && (
              <img
                src={img}
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
                <source src={`${process.env.REACT_APP_SERVER_URL}/video.mp4?t=${new Date()}`} type="video/mp4" />
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
              title="Bewaren"
              onClick={this.uploadPicture}
              className={css`margin-bottom: 100px;`}
            />
            <RegularButton
              size="small"
              img="refresh"
              title="Opnieuw"
              onClick={history.goBack}
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
});

export default connect(mapStateToProps)(ReviewPage);
