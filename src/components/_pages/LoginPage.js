import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

class LoginPage extends React.Component {
  responseGoogle = (resp) => {
    console.log('Login failed.');
    console.log(resp);
  }

  successResponseGoogle = (googleUser) => {
    const { dispatch, history } = this.props;

    console.log(googleUser);
    this.setRefreshTimeout(googleUser.tokenObj.expires_at);

    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: googleUser.tokenObj.access_token,
    });

    dispatch({
      type: 'SET_GOOGLE_USER',
      payload: googleUser,
    });

    history.push('/album');
  }

  setRefreshTimeout = (expiresAt) => {
    const oneMin = 60 * 1000;
    const refreshDeadline = Math.max(5 * oneMin, expiresAt - Date.now() - (5 * oneMin));

    console.log(`Refreshing credentials in ${
      Math.floor(refreshDeadline / oneMin).toString()
    } minutes`);

    setTimeout(this.reloadAuthToken, refreshDeadline);
  }

  reloadAuthToken = async () => {
    const { dispatch, googleUser } = this.props;

    try {
      const tokenObj = await googleUser.reloadAuthResponse();

      dispatch({
        type: 'SET_ACCESS_TOKEN',
        payload: tokenObj.access_token,
      });

      this.setRefreshTimeout(tokenObj.expires_at);
    } catch (error) {
      console.log('Could not refresh token');
      console.log(error.response);
    }
  }

  render = () => (
    <div className="StartPage">
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--2">Welkom op de KdG Photobooth!</Heading>

          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            onSuccess={resp => this.successResponseGoogle(resp)}
            onFailure={resp => this.responseGoogle(resp)}
            scope="profile email https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing https://mail.google.com/"
            prompt="consent"
            loginHint="photobooth@kdg.be"
            render={renderProps => (
              <RegularButton
                img="check"
                alt="Login button."
                size="large"
                title="Druk om in te loggen."
                onClick={renderProps.onClick}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  googleUser: state.googleUser,
});

export default connect(mapStateToProps)(LoginPage);
