import React, { useState } from 'react';

const CaptureButton = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = () => {
    setIsClicked(true);
    onClick();
  };

  return (
    <button className={`CaptureButton ${isClicked ? 'clicked' : ''}`} onClick={onClickHandler} type="button">
      <i className="fas fa-camera-retro" />
    </button>
  );
};

export default CaptureButton;
