import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Heading from '../titles/Heading';
import CreateAlbumForm from '../albums/CreateAlbumForm';

class SelectAbumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
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

        this.setState({ albums });
      } catch (error) {
        console.log(error.response);

        if (error.response && error.response.status === 401) {
          history.push('/login');
        }
      }
    }
  }

  setDefaultAlbum = async (event) => {
    const { history, dispatch } = this.props;
    const { albums } = this.state;
    const selectedAlbum = albums.find(({ id }) => id === event.target.value);
    console.log('TCL: SelectAbumPage -> setDefaultAlbum -> event', event);
    console.log('TCL: SelectAbumPage -> setDefaultAlbum -> selectedAlbum', selectedAlbum);

    await dispatch({
      type: 'SET_ALBUM',
      payload: selectedAlbum,
    });

    history.push('/');
  }

  renderAlbums = albums => albums.filter(el => el.title.toLowerCase() !== 'frames').map(album => (
    <option key={album.id} value={album.id} className={css`margin-bottom: 8px;`}>{album.title}</option>
  ))

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
    const { albums } = this.state;

    return (
      <div className="SelectAlbumPage">
        <div className="wrapper">
          <div>
            <Heading
              type="heading--3"
            >
              Selecteer een album.
            </Heading>

            <div
              className={css`
              display: flex;
              justify-content: center;
              margin-bottom: 48px;
                `}
            >
              <select
                multiple
                className={css`
                width: 80%;
                font-size: 20px;
                padding: 8px 16px;
                min-height: 200px;
              `}
                onChange={this.setDefaultAlbum}
              >
                {albums ? this.renderAlbums(albums) : 'No albums found'}
              </select>
            </div>
            <CreateAlbumForm />
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
