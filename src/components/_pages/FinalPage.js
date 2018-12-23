import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import QRCode from 'react-qr-code';
import axios from 'axios';

class FinalPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    componentDidMount() {
      if(!this.props.location.state || !this.props.location.state.googleUser) {
        this.props.history.push('/login')
      }
      else if(!this.props.location.state.album) {
        this.props.history.push('/album')
      }
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value})
    }

    sendEmail = async (e) => {
      e.preventDefault()
      try {
        const resp = await axios.post('http://192.168.1.42:8888/sendPictureToEmail', {
            token: this.props.location.state.googleUser.accessToken,
            email: this.state.email,
        })
        console.log(resp);
      } catch (error) {
        console.log('Send Email', error)
      }
    }

    render = () => {
        return (
            <div className='StartPage'>
                <div className="wrapper">
                <div className='left'>
                <Heading>Je foto is verstuurt! Bekijk de album via de QR-code!</Heading>
                </div>
                <div className=''>
                    <form onSubmit={(e) => this.sendEmail(e)}>
                        <input name='email' placeholder="youremail@domain.com" onChange={(e) => this.onChangeHandler(e)} value={this.state.email} />
                        <button type='submit'>Send the picture to your email</button>
                    </form>
                    <QRCode value={this.props.location.state.album.shareInfo.shareableUrl} />
                    
                    <RegularButton 
                      img='camera' 
                      alt='Large green button with camera icon in it.' 
                      size='large' 
                      title='Neem een nieuwe foto.'
                      onClick={() => this.props.history.push('/', { googleUser: this.props.location.state.googleUser, album: this.props.location.state.album })}
                    />
                </div>
                </div>
            </div>
        )
    }
}

export default FinalPage;