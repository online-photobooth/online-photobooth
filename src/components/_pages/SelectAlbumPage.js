import React from 'react';
import Heading from '../titles/Heading';
import axios from 'axios';

class SelectAbumPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            albums: [],
            selectedAlbum: [],
            newAlbum: '',
        };
    }

    updateNewAlbum(event){
      this.setState({newAlbum : event.target.value})
      }

    async componentDidMount() {
      if(!this.props.location.state || !this.props.location.state.accessToken) {
        this.props.history.push('/login')
      } else {
        try {
          const resp = await axios.get('https://photoslibrary.googleapis.com/v1/sharedAlbums?excludeNonAppCreatedData=true', {
            headers: {
              Authorization: 'Bearer ' + this.props.location.state.accessToken
            }
          })
          console.log(resp);
          
          const albums = resp.data.sharedAlbums
          this.setState({ albums })
        } catch (error) {
          console.log(error);
        }
      }
    }

    setDefaultAlbum = (selectedAlbum) => {
      this.setState({ selectedAlbum })
      this.props.history.push('/', { accessToken: this.props.location.state.accessToken, album: selectedAlbum })
    }

    renderAlbums = () => {
        return this.state.albums.map(album => 
            <div key={album.id}>
              <h3>{ album.title }</h3>
              <button onClick={ () => this.setDefaultAlbum(album) }>Select this Album</button>
            </div>
        )
    }

    createNewAlbum = async (e) => {
        e.preventDefault()
        if(this.state.newAlbum === '') return false
        try {
          const resp = await axios({
            method: 'POST',
            url: 'https://photoslibrary.googleapis.com/v1/albums', 
            headers: {
              Authorization: 'Bearer ' + this.props.location.state.accessToken,
              'Content-type': 'application/json',
            },
            data: {
              'album': {'title': this.state.newAlbum}
            }
          })

          console.log(resp);
          try {
            const resp2 = await axios({
              method: 'POST',
              url: `https://photoslibrary.googleapis.com/v1/albums/${resp.data.id}:share`, 
              headers: {
                Authorization: 'Bearer ' + this.props.location.state.accessToken,
                'Content-type': 'application/json',
              },
              data: {
                'sharedAlbumOptions': {
                  'isCollaborative': 'false',
                  'isCommentable': 'false'
                }
              }
            })
          console.log(resp2)
          const selectedAlbum = {
            ...resp.data,
            ...resp2.data
          }
          console.log(selectedAlbum);
          
          this.setState({ selectedAlbum })
          this.props.history.push('/', { accessToken: this.props.location.state.accessToken, album: selectedAlbum })
        } catch (error) {
            console.log('Sharing album went wrong')
            console.log(error)
          }
        } catch (error) {
          console.log('Creating album went wrong')
          console.log(error);
        }
    }

    render = () => {
        return (
            <div className='StartPage'>
                <div className='wrapper'>
                    <div className=''>
                        <Heading>Selecteer een Album.</Heading>
                    </div>

                    <div className=''>
                        <form onSubmit={(e) => this.createNewAlbum(e)}>
                          <input name='albumName' onChange={(e) => this.updateNewAlbum(e)} />
                          <button type='submit'>Create new Album</button>
                        </form>
                        { this.state.albums ? this.renderAlbums() : 'No albums found' }
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectAbumPage;