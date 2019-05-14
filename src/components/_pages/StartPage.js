import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

const StartPage = ({ album, dispatch, history }) => {
  useEffect(() => () => {
    if (!album) {
      history.push('/album');
    }
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
                title="Neem 1 foto."
                onClick={() => setFormat('single')}
              />
            </div>
            <RegularButton
              img="camera"
              alt="Take a single picture."
              size="large"
              title="Neem een Gif."
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
});

export default connect(mapStateToProps)(StartPage);
