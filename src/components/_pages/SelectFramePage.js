import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Heading from '../titles/Heading';

const SelectFramePage = ({ dispatch, history }) => {
  const frames = ['/images/frames/frame_1.png', '/images/frames/frame_2.png'];

  const setFrame = async (frame) => {
    await dispatch({
      type: 'SET_FRAME',
      payload: frame,
    });
    history.push('/preview');
  };

  const renderImages = () => frames.map(frame => (
    <button key={frame} onClick={() => setFrame(frame)} type="button" className="button-none mr-16">
      <img src={frame} alt="Kdg Frame" className={css`border: 1px solid black; max-width: 40vw;`} />
    </button>
  ));

  return (
    <div className="SelectAlbumPage">
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--3">Kies je Frame</Heading>

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
  frames: state.frames,
});

export default connect(mapStateToProps)(SelectFramePage);
