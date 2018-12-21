import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

class StartPage extends React.Component {

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
                        <Heading>Welkom op de { this.props.location.state ? this.props.location.state.album.title : ''}!</Heading>
                    </div>

                    <div className='right'>
                        <RegularButton 
                            img='camera' 
                            alt='Large green button with camera icon in it.' 
                            size='large' 
                            title='Druk om verder te gaan.'
                            onClick={() => this.props.history.push('/preview', { accessToken: this.props.location.state.accessToken, album: this.props.location.state.album })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default StartPage;