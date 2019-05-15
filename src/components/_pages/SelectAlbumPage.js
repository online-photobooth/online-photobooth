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
        const framesId = albums.find(el => el.title.toLowerCase() === 'frames').id;

        await this.setFrames(framesId);

        this.setRefreshTimeout(framesId);

        this.setState({ albums });
      } catch (error) {
        console.log(error.response);

        if (error.response.status === 401) {
          history.push('/login');
        }
      }
    }
  }

  setDefaultAlbum = (selectedAlbum) => {
    const { history, dispatch } = this.props;

    dispatch({
      type: 'SET_ALBUM',
      payload: selectedAlbum,
    });

    history.push('/');
  }

  renderAlbums = albums => albums.filter(el => el.title.toLowerCase() !== 'frames').map(album => (
    <SingleAlbum key={album.id} album={album} onClick={this.setDefaultAlbum} />
  ))

  createNewAlbum = async (e) => {
    const { accessToken, history, dispatch } = this.props;
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

      dispatch({
        type: 'SET_ALBUM',
        payload: selectedAlbum,
      });

      history.push('/');
    } catch (error) {
      console.log('Sharing album went wrong');
      console.log(error.response);
    }

    return true;
  }

  setRefreshTimeout = (framesId) => {
    const oneMin = 60 * 1000;
    const refreshDeadline = 55 * oneMin;

    console.log(`Refreshing frames in ${
      Math.floor(refreshDeadline / oneMin).toString()
    } minutes`);

    setTimeout(() => {
      this.setFrames(framesId);
      this.setRefreshTimeout(framesId);
    }, refreshDeadline);
  }

  setFrames = async (framesId) => {
    const { dispatch, accessToken } = this.props;

    // Fetch Frames Album
    try {
      const resp = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search',
        {
          albumId: framesId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

      console.log(resp);

      const frames = resp.data.mediaItems;
      dispatch({
        type: 'SET_FRAMES',
        payload: frames,
      });
    } catch (error) {
      console.log(error.response);
    }
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
                {albums ? this.renderAlbums(albums) : 'No albums found'}
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
