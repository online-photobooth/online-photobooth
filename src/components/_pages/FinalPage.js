import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import QRCode from 'react-qr-code';

class FinalPage extends React.Component {

    componentDidMount() {
      if(!this.props.location.state || !this.props.location.state.accessToken) {
        this.props.history.push('/login')
      }
      else if(!this.props.location.state.album) {
        this.props.history.push('/album')
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
                        <QRCode value={this.props.location.state.album.productUrl} />
                        <RegularButton 
                            img='camera' 
                            alt='Large green button with camera icon in it.' 
                            size='large' 
                            title='Neem een nieuwe foto.'
                            onClick={() => this.props.history.push('/', { accessToken: this.props.location.state.accessToken, album: this.props.location.state.album })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FinalPage;