import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import { checkRefresh } from '../services/refreshLogin';

const StartPage = ({
  album, dispatch, history, expiresAt, googleUser,
}) => {
  useEffect(() => {
    if (!album.title) {
      console.log('Startpage TCL: album', album.title);
      history.push('/album');
    }

    checkRefresh(expiresAt, dispatch, googleUser);
  });

  const setFormat = async (format) => {
    await dispatch({
      type: 'SET_FORMAT',
      payload: format,
    });

    history.push('/frame');
  };

  return (
    <div className="StartPage">
      <div className="wrapper">
        <div className={css`
          width: 50%;
          `}
        >
          <Heading
            type="heading--2"
          >
            Wat wil je maken?
          </Heading>
          <div className={css`
          display: flex;
          justify-content: space-between;
          `}
          >
            <div>
              <RegularButton
                img="camera"
                alt="Take a single picture."
                size="large"
                onClick={() => setFormat('single')}
                title="Een foto"
              />
            </div>

            <div>
              <RegularButton
                img="film"
                alt="Take a single picture."
                size="large"
                onClick={() => setFormat('gif')}
                title="Een GIF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  album: state.album,
  expiresAt: state.expiresAt,
  googleUser: state.googleUser,
});

export default connect(mapStateToProps)(StartPage);
