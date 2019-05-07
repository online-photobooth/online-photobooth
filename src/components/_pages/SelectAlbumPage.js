import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';
import SingleAlbum from '../albums/SingleAlbum';

class SelectAbumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      newAlbum: '',
    };
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount = async () => {
    const { accessToken, history } = this.props;

    if (!accessToken) {
      console.log('redirecting from album to login');
      history.push('/login');
    } else {
      try {
        const resp = await axios.get('https://photoslibrary.googleapis.com/v1/sharedAlbums', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(resp);

        const albums = resp.data.sharedAlbums;
        this.setState({ albums });
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  setDefaultAlbum = (selectedAlbum) => {
    const { history } = this.props;

    history.push('/', { album: selectedAlbum });
  }

  renderAlbums = albums => albums.map(album => (
    <SingleAlbum key={album.id} album={album} onClick={this.setDefaultAlbum} />
  ))

  createNewAlbum = async (e) => {
    const { accessToken, history } = this.props;
    const { newAlbum } = this.state;

    e.preventDefault();
    if (newAlbum === '') return false;

    let newAlbumResponse;

    // CREATE ALBUM
    try {
      newAlbumResponse = await axios({
        method: 'POST',
        url: 'https://photoslibrary.googleapis.com/v1/albums',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
        data: {
          album: { title: newAlbum },
        },
      });
      console.log(newAlbumResponse);
    } catch (error) {
      console.log('Creating album went wrong');
      console.log(error.response);
    }

    // SHARE ALBUM
    try {
      const shareAlbumResponse = await axios({
        method: 'POST',
        url: `https://photoslibrary.googleapis.com/v1/albums/${newAlbumResponse.data.id}:share`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
        data: {
          sharedAlbumOptions: {
            isCollaborative: 'false',
            isCommentable: 'false',
          },
        },
      });

      console.log(shareAlbumResponse);
      const selectedAlbum = {
        ...newAlbumResponse.data,
        ...shareAlbumResponse.data,
      };
      console.log(selectedAlbum);

      history.push('/', { album: selectedAlbum });
    } catch (error) {
      console.log('Sharing album went wrong');
      console.log(error.response);
    }

    return true;
  }

  render = () => {
    const { albums, newAlbum } = this.state;

    return (
      <div className="SelectAlbumPage">
        <div className="wrapper">
          <div className="content">
            <Heading>Selecteer een Album.</Heading>

            <div className="albumOverview">
              <form onSubmit={e => this.createNewAlbum(e)}>
                <input
                  name="newAlbum"
                  value={newAlbum}
                  onChange={this.onChangeHandler}
                  placeholder="Maak een nieuw album aan"
                />

                <button type="submit">
                  AANMAKEN
                </button>
              </form>

              <div className={`albums ${albums && albums.length === 1 ? 'one-item' : ''} `}>
                { albums ? this.renderAlbums(albums) : 'No albums found' }
              </div>
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

export default connect(mapStateToProps)(SelectAbumPage);
