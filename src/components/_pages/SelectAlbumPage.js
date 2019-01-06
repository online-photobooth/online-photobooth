import React from 'react';
import Heading from '../titles/Heading';
import axios from 'axios';
import { connect } from 'react-redux';
import SingleAlbum from '../albums/SingleAlbum';

class SelectAbumPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
			albums: [],
/* 			albums: [
				{
					"title": "Event 1"
				},
				{
					"title": "Event 2"
				},
				{
					"title": "Event 3"
				},
				{
					"title": "Event 4"
				},
				{
					"title": "Event 5"
				},
				{
					"title": "Event 6"
				},
				{
					"title": "Event 7"
				},
			], */
            selectedAlbum: [],
			newAlbum: '',
			albumName: '',
			selectedAlbum: '',
        };
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    componentDidMount = async () => {
		if (!this.props.accessToken) 
		{
			console.log('redirecting from album to login');
			this.props.history.push('/login')
		} 
		else 
		{
			try 
			{
				const resp = await axios.get('https://photoslibrary.googleapis.com/v1/sharedAlbums?excludeNonAppCreatedData=true', {
					headers: {
						Authorization: 'Bearer ' + this.props.accessToken
					}
				});

				console.log(resp);
				
				const albums = resp.data.sharedAlbums;
				this.setState({ albums });
			} 
			catch (error) 
			{
				console.log(error);
			}
        }
    }

    setDefaultAlbum = (selectedAlbum) => {
		console.log('CLICKED');

		console.log('FROM setDefaultAlbum');
		console.log(selectedAlbum);

        this.setState({ selectedAlbum });
        this.props.history.push('/', { album: selectedAlbum })
    }

    renderAlbums = () => {
        return this.state.albums.map((album, i) => (
/*             <div key={album.id}>
              <h3>{ album.title }</h3>
              <button onClick={ () => this.setDefaultAlbum(album) }>Select this Album</button>
            </div> */

			<SingleAlbum key={ i } album={ album } onClick={ this.setDefaultAlbum }/>
        ))
    }

    createNewAlbum = async (e) => {
        e.preventDefault()
		if(this.state.newAlbum === '') return false
		
        // CREATE ALBUM
		try 
		{
			const resp = await axios({
				method: 'POST',
				url: 'https://photoslibrary.googleapis.com/v1/albums', 
				headers: {
				Authorization: 'Bearer ' + this.props.accessToken,
				'Content-type': 'application/json',
				},
				data: {
				'album': {'title': this.state.newAlbum}
				}
			})

          	console.log(resp);
          	// SHARE ALBUM
			try 
			{
				const resp2 = await axios({
					method: 'POST',
					url: `https://photoslibrary.googleapis.com/v1/albums/${resp.data.id}:share`, 
					headers: {
						Authorization: 'Bearer ' + this.props.accessToken,
						'Content-type': 'application/json',
					},
					data: {
						'sharedAlbumOptions': {
						'isCollaborative': 'false',
						'isCommentable': 'false'
						}
					}
					});

				console.log(resp2)
				const selectedAlbum = {
					...resp.data,
					...resp2.data
				}
				console.log(selectedAlbum);
				
				this.setState({ selectedAlbum })
				this.props.history.push('/', { album: selectedAlbum })
			} 
			catch (error) 
			{
				console.log('Sharing album went wrong')
				console.log(error.response)
			}
		} 
		catch (error) 
		{
          console.log('Creating album went wrong')
          console.log(error.response);
        }
    }

    render = () => {
        return (
            <div className='SelectAlbumPage'>
                <div className='wrapper'>
					<div className="content">
						<Heading>Selecteer een Album.</Heading>

						<div className="albumOverview">
							<form onSubmit={(e) => this.createNewAlbum(e)}>
								<input 
									name='albumName' 
									value={ this.state.albumName } 
									onChange={ this.onChangeHandler } 
									placeholder='Maak een nieuw album aan'
								/>

								<button type='submit'>
									AANMAKEN
								</button>
							</form>

							<div className="albums">
								{ this.state.albums ? this.renderAlbums() : 'No albums found' }
							</div>
						</div>
					</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  	accessToken: state.accessToken
});

export default connect(mapStateToProps)(SelectAbumPage);