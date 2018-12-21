import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import GoogleLogin from 'react-google-login';

class LoginPage extends React.Component {
    responseGoogle(resp) {
      console.log('Login failed.');
      console.log(resp);
    }

    render = () => {
        return (
            <div className='StartPage'>
                <div className="wrapper">
                    <div className='left'>
                        <Heading>Welkom op de KdG Photobooth!!!!!</Heading>
                    </div>
                    <div className='right'>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_CLIENT_ID}
                            onSuccess={(resp) => this.props.history.push('/album', { accessToken: resp.accessToken})}
                            onFailure={(resp) => this.responseGoogle(resp)}
                            scope="profile email https://www.googleapis.com/auth/photoslibrary.sharing"
                            prompt="consent"
                            render={renderProps => (
                                <RegularButton 
                                    img='check' 
                                    alt='Large green button with camera icon in it.' 
                                    size='large' 
                                    title='Druk om in te loggen.'
                                    onClick={renderProps.onClick}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;