import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import axios from 'axios';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory({
  forceRefresh: true
});
class StartPage extends React.Component {

    async takePicture() {
      const resp = await axios.get('http://192.168.0.105:8888/takePictureWithoutSaving')
      const picture = resp.data.image
      history.push('/review', { picture, accessToken: this.props.location.state.accessToken })
    }

    render = () => {
        return (
            <div className='StartPage'>
                <div className="wrapper">
                    <div className='left'>
                        <Heading>Welkom op de KdG opencampusdag!</Heading>
                    </div>

                    <div className='right'>
                        <RegularButton 
                            img='camera' 
                            alt='Large green button with camera icon in it.' 
                            size='large' 
                            title='Druk om verder te gaan.'
                            onClick={() => this.takePicture()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default StartPage;