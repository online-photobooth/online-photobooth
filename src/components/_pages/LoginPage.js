import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import BaseButton from '../buttons/BaseButton';
import Heading from '../titles/Heading';

class LoginPage extends React.Component {
  responseGoogle = (resp) => {
    console.log('Login failed.');
    console.log(resp);
  }

  successResponseGoogle = (googleUser) => {
    const { dispatch, history } = this.props;

    console.log(googleUser);
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: googleUser.tokenObj.access_token,
    });

    dispatch({
      type: 'SET_EXPIRES_AT',
      payload: googleUser.tokenObj.expires_at,
    });

    dispatch({
      type: 'SET_GOOGLE_USER',
      payload: googleUser,
    });

    history.push('/album');
  }

  render = () => (
    <div className="flex">
      <img src="/style/img/movie-strip.png" alt="Movie Strip" />
      <div className="">
        <Heading type="heading--2">Welkom op de KdG Photobooth.</Heading>

        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          onSuccess={resp => this.successResponseGoogle(resp)}
          onFailure={resp => this.responseGoogle(resp)}
          scope="profile email https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing https://mail.google.com/"
          prompt="consent"
          loginHint="photobooth@kdg.be"
          render={renderProps => (
            <BaseButton
              onClick={renderProps.onClick}
            >
              Let's get this party started!
            </BaseButton>
          )}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  googleUser: state.googleUser,
});

export default connect(mapStateToProps)(LoginPage);
