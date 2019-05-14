import React from 'react';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';

const SelectFramePage = ({ frames }) => {
  console.log('TCL: SelectFramePage -> frames', frames);

  const renderImages = () => frames.map(frame => (
    <img key={frame.id} src={frame.baseUrl} alt="Kdg Frame" />
  ));

  return (
    <div className="SelectAlbumPage">
      <div className="wrapper">
        <div className="content">
          <Heading>Selecteer een Frame.</Heading>

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
