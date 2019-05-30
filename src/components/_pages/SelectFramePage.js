import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Heading from '../titles/Heading';

const SelectFramePage = ({ frames, dispatch, history }) => {
  const setFrame = async (frame) => {
    await dispatch({
      type: 'SET_FRAME',
      payload: frame,
    });
    history.push('/preview');
  };

  const renderImages = () => frames.map(frame => (
    <button key={frame.id} onClick={() => setFrame(frame)} type="button" className="button-none mr-16">
      <img src={frame.baseUrl} alt="Kdg Frame" className={css`border: 1px solid black;`} />
    </button>
  ));

  return (
    <div className="SelectAlbumPage">
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--3">Kies je Frame</Heading>

          <div className="flex justify-between">
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
