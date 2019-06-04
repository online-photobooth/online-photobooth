import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { css } from 'emotion';
import RegularButton from '../buttons/RegularButton';

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      gif: false,
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
      history, accessToken, album,
    } = this.props;

    try {
      history.push('/final');
      const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadLastImageTaken`, {
        token: accessToken,
        album: album.id,
      });

      console.log(resp);

      if (resp.status === 200) {
        history.push('/final');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render = () => {
    const { img, gif } = this.state;
    const { history } = this.props;

    return (
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
            <div className="img_container">
              <img src={img} alt="Taken by our photobooth." />
            </div>
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
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  format: state.format,
  album: state.album,
});

export default connect(mapStateToProps)(ReviewPage);
