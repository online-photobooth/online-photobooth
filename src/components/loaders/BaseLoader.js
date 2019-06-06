import React from 'react';
import { css } from 'emotion';
import { SyncLoader } from 'react-spinners';
import { colorS } from '../../assets/variables';

const BaseLoader = ({ loading }) => (
  <div
    className={css`
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%)
    `}
  >
    <SyncLoader
      color={colorS}
      size={50}
      loading={loading}
    />
  </div>
);


export default BaseLoader;
