import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { css } from 'emotion';
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
    <div className={
      css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    `}
    >
      <div className={
        css`
        display: flex;
        justify-content: center;
        height: 60%;
      `}
      >
        <div
          className={
            css`
            margin-right: 40px;
          `}
        >
          <img
            className={
              css`
            max-height: 100%;
          `}
            src="/style/img/movie-strip.png"
            alt="Movie Strip"
          />
        </div>
        <div className={
          css`
        display: flex;
        flex-direction: column;
      `}>
          <Heading type="heading--3">Welkom op de KdG photobooth.</Heading>

          <div className={
            css`
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
           `}
          >
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
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  googleUser: state.googleUser,
});

export default connect(mapStateToProps)(LoginPage);
