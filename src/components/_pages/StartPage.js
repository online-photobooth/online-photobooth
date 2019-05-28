import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import Triangles from '../app/Triangles';
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

  const title = `Welkom op de ${album ? album.title : ''}!`;

  return (
    <div className="StartPage">
      <Triangles />
      <div className="wrapper">
        <div className="content">
          <Heading>{title}</Heading>
          <div className="flex">
            <div
              className="mr-2"
            >
              <RegularButton
                img="camera"
                alt="Take a single picture."
                size="large"
                title="Maak een foto"
                onClick={() => setFormat('single')}
              />
            </div>
            <RegularButton
              img="film"
              alt="Take a single picture."
              size="large"
              title="Maak een GIF"
              onClick={() => setFormat('gif')}
            />
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
