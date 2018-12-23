import React from 'react';
import RegularButton from '../buttons/RegularButton';
import axios from 'axios';
import { connect } from 'react-redux';

class ReviewPage extends React.Component {  
  
    componentDidMount() {
      if(!this.props.location.state || !this.props.location.state.googleUser) {
        this.props.history.push('/login')
      }
      else if(!this.props.location.state.album) {
        this.props.history.push('/album')
      }
    }

    async uploadPicture() {
      try {
        const resp = await axios.post('http://192.168.1.42:8888/uploadLastImageTaken', {
            token: this.props.accessToken,
            album: this.props.location.state.album.id,
        })
        console.log(resp);
        
        if(resp.status === 200) {
          this.props.history.push('/final', { googleUser: this.props.location.state.googleUser, album: this.props.location.state.album })
        }
      } catch (error) {
        console.log(error);
      }
    }

    render = () => {
        return (
            <div className='ReviewPage'>
                <img src={ this.props.location.state.picture } alt="" style={{maxHeight: '100vh', maxWidth: '100vw'}}/>
                <div style={{position: 'absolute', top: '30%', right: '10px', zIndex: 5}}><RegularButton
                img='send'
                alt='Large green button with a send icon in it.'
                size='large'
                title='Content? Verzend.'
                onClick={() => this.uploadPicture()}
                /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  accessToken: state.accessToken
});
export default connect(mapStateToProps)(ReviewPage);