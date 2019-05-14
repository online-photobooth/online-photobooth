import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
      <div className="ReviewPage">
        <div className="wrapper">
          <div className="content">
            {img && (
              <div className="img_container">
                <img src={img} alt="Taken by our photobooth." />
              </div>
            )}
            {gif && (
              <video autoPlay playsInline loop preload="none">
                <source src={`${process.env.REACT_APP_SERVER_URL}/video.mp4`} type="video/mp4" />
              </video>
            )}
            <div className="button_container">
              <RegularButton
                size="small"
                img="refresh"
                title="Opnieuw"
                onClick={history.goBack}
              />

              <RegularButton
                size="small"
                img="check"
                title="Oke!"
                onClick={this.uploadPicture}
              />
            </div>
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
