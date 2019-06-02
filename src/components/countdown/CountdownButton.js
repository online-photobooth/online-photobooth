import React, { useState } from 'react';
import RegularButton from '../buttons/RegularButton';

const Countdown = ({
  timer = 3,
  onDone,
  size = 'large',
  text = '',
}) => {
  let countdown;
  const [counting, setCounting] = useState(false);
  const [localTimer, setLocalTimer] = useState(timer);
  console.log('Mount: counting', counting);

  function startCountdown() {
    console.log('Start: counting', counting);
    setCounting(true);
    countdown = setInterval(() => {
      if (localTimer !== 0) {
        setLocalTimer(localTimer - 1);
      } else {
        setCounting(false);
        setLocalTimer(timer);
        clearInterval(countdown);
        onDone();
      }
    }, 1000);
  }

  return (
    <RegularButton
      className="flash_screen"
      text={counting ? text : localTimer}
      size={size}
      onClick={() => startCountdown()}
    />
  );
};

export default Countdown;
