import React, { useState, useEffect, useRef } from 'react';
import RegularButton from '../buttons/RegularButton';

const Countdown = ({
  timer = 3,
  onDone,
  size = 'large',
  text = '',
}) => {
  const [counting, setCounting] = useState(false);
  const [localTimer, setLocalTimer] = useState(timer);
  const latestCount = useRef(localTimer);

  useEffect(
    () => {
      latestCount.current = localTimer;

      if (counting) {
        setTimeout(() => {
          if (latestCount.current > 0) {
            setLocalTimer(latestCount.current - 1);
          } else {
            setCounting(false);
            setLocalTimer(timer);
            onDone();
          }
        }, 1000);
      }
    },
  );

  return (
    <RegularButton
      className="flash_screen"
      text={counting ? localTimer : text}
      size={size}
      onClick={() => setCounting(true)}
    />
  );
};

export default Countdown;
