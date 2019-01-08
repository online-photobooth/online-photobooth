import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { connect } from 'react-redux';

class FinalPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    componentDidMount = () => {
      if(!this.props.location.state || !this.props.location.state.album) {
        this.props.history.push('/album')
      }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    sendEmail = async (e) => {
      e.preventDefault()
      console.log('Sending mail!');
      
      try {
        const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendPictureToEmail`, {
            token: this.props.accessToken,
            title: this.props.location.state.album.title,
            email: this.state.email,
        })
        console.log(resp);
      } catch (error) {
        console.log('Send Email', error.response)
      }
    }

    render = () => {
        return (
            <div className='FinalPage'>
                <div className="wrapper">
                    <div className="flex_container">
                        <div className="left">
                            <Heading>Je foto is verstuurd! Bekijk het album via de QR-code!</Heading>
                            <QRCode value={this.props.location.state.album.shareInfo.shareableUrl} />
                        </div>

                        <div className="right">
                            <div className="buttons">
                                <RegularButton 
                                    img='camera' 
                                    alt='Large green button with camera icon in it.' 
                                    size='small' 
                                    title='Neem een nieuwe foto'
                                    onClick={() => this.props.history.push('/', { album: this.props.location.state.album })}
                                />

                                <RegularButton 
                                    img='camera' 
                                    alt='Large green button with camera icon in it.' 
                                    size='small' 
                                    title='Neem een nieuwe foto'
                                    onClick={() => this.props.history.push('/', { album: this.props.location.state.album })}
                                />
                            </div>
                            <Heading>
                                Wil je de foto in je mailbox ontvangen?
                            </Heading>

                            <form onSubmit={(e) => this.sendEmail(e)}>
                                <input name='email' placeholder="youremail@domain.com" onChange={(e) => this.onChangeHandler(e)} value={this.state.email} />
                                <button type='submit'>Verstuur de foto naar mijn email</button>
                            </form>
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
export default connect(mapStateToProps)(FinalPage);