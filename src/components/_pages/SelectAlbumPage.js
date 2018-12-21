import React from 'react';
import Heading from '../titles/Heading';
import axios from 'axios';

class SelectAbumPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            albums: [],
            selectedAlbum: [],
        };
    }

    async componentDidMount() {
      if(!this.props.location.state || !this.props.location.state.accessToken) {
        this.props.history.push('/login')
      }
      try {
        const resp = await axios.get('https://photoslibrary.googleapis.com/v1/albums', {
          headers: {
            Authorization: 'Bearer ' + this.props.location.state.accessToken
          }
        })
        console.log(resp);
        
        const albums = resp.data.albums
        this.setState({ albums })
      } catch (error) {
        console.log(error);
      }
    }

    setDefaultAlbum = (selectedAlbum) => {
      this.setState({ selectedAlbum })
      this.props.history.push('/preview', { accessToken: this.props.location.state.accessToken, album: selectedAlbum })
    }

    renderAlbums = () => {
        return this.state.albums.map(album => 
            <div key={album.id}>
              <h3>{ album.title }</h3>
              <button onClick={ () => this.setDefaultAlbum(album) }>Select this Album</button>
            </div>
        )
    }

    render = () => {
        return (
            <div className='StartPage'>
                <div className="wrapper">
                    <div className=''>
                        <Heading>Selecteer een Album.</Heading>
                    </div>

                    <div className=''>
                        { this.state.albums ? this.renderAlbums() : 'No albums found' }
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectAbumPage;