import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RegularButton from '../buttons/RegularButton';

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      images: [],
    };
  }

  componentWillMount = async () => {
    const { location } = this.props;

    if (location.state.picture) {
      this.setState({ img: location.state.picture });
    } else if (location.state.pictures) {
      const gif = await this.fetchGif(location.state.pictures)
      this.setState({ img: gif });
    }
  }

  componentDidMount = () => {
    const { location, history } = this.props;

    if (!location.state || !location.state.album) {
      history.push('/album');
    }
  }

  goBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  uploadPicture = async () => {
    const { location, history, accessToken } = this.props;

    try {
      history.push('/final', { album: location.state.album });
      const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadLastImageTaken`, {
        token: accessToken,
        album: location.state.album.id,
      });

      console.log(resp);

      if (resp.status === 200) {
        history.push('/final', { album: location.state.album });
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchGif = async (images) => {
    const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createGif`, {
      images,
    });

    return resp;
  }

  renderImages = () => {
    const { images } = this.state;

    return images.map((image, i) => (<div className="mr-2" style={{width: '300px'}} key={i}><img src={image} width="100%" height="auto" alt="Taken by our photobooth." /></div>));
  }

  render = () => {
    const { img, images } = this.state;

    return (
      <div className="ReviewPage">
        <div className="wrapper">
          <div className="content">
            { img && (
              <div className="img_container">
                <img src={img} alt="Taken by our photobooth." />
              </div>
            )}
            { images && (
              <div className="flex">
                {this.renderImages()}
              </div>
            )}
            <div className="button_container">
              <RegularButton
                size="small"
                img="refresh"
                title="Opnieuw"
                onClick={this.goBack}
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
});

export default connect(mapStateToProps)(ReviewPage);
