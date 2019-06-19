import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { Image } from 'cloudinary-react';
import Heading from '../titles/Heading';

const SelectFramePage = ({ dispatch, history, frames }) => {
  const setFrame = async (frame) => {
    await dispatch({
      type: 'SET_FRAME',
      payload: frame,
    });
    history.push('/filter');
  };

  const renderImages = () => frames.map(frame => (
    <button key={frame} onClick={() => setFrame(frame)} type="button" className="button-none mr-16">
      <Image cloudName="perjor" publicId={frame} width="1200" height="800" crop="scale" className={css`border: 1px solid black; max-width: 40vw; height: auto;`} />
    </button>
  ));

  return (
    <div className="SelectAlbumPage">
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--3">Choose your Frame</Heading>

          <div className={css`
            display: flex;
            justify-content: space-between;
            max-width: 100vw;
          `}
          >
            {frames && renderImages()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  frames: state.settings.frames,
});

export default connect(mapStateToProps)(SelectFramePage);
