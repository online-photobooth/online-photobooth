import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { css } from 'emotion';
import BaseButton from '../buttons/BaseButton';
import Heading from '../titles/Heading';

const LoginPage = ({ dispatch, history }) => {
  const responseGoogle = (resp) => {
    console.log('Login failed.');
    console.log(resp);
  };

  const successResponseGoogle = (googleUser) => {
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
  };

  return (
    <div className={
      css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      position: relative;
    `}
    >
      <div className={css` position: absolute; top: 10px; right: 10px;`}>
        <BaseButton
          size="small"
          onClick={() => history.push('/settings')}
        >
    Settings
        </BaseButton>
      </div>
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
            className={css`
            max-height: 100%;
          `}
            src="/images/icons/photobooth-logo.png"
            alt="Movie Strip"
          />
        </div>
        <div className={css`
        display: flex;
        flex-direction: column;
      `}>
          <Heading type="heading--3">Welcome to the Online Photo-booth.</Heading>

          <div className={
            css`
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
           `}
          >
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              onSuccess={resp => successResponseGoogle(resp)}
              onFailure={resp => responseGoogle(resp)}
              scope="https://www.googleapis.com/auth/photoslibrary.sharing"
              prompt="consent"
              render={renderProps => (
                <BaseButton
                  onClick={renderProps.onClick}
                >
                  {'Let\'s get this party started!'}
                </BaseButton>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  googleUser: state.googleUser,
});

export default connect(mapStateToProps)(LoginPage);
