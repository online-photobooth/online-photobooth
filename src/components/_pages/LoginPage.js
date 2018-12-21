import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import GoogleLogin from 'react-google-login';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory({
  forceRefresh: true
});

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
                            clientId="101871442630-48t1albcpttlf4jn8q65cn2e872m2s47.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={(resp) => history.push('/', { accessToken: resp.accessToken})}
                            onFailure={(resp) => this.responseGoogle(resp)}
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