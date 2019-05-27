import React from 'react';
import { css } from 'emotion';
import { colorS } from '../../assets/variables';

const BaseButton = ({ onClick, children }) => (
  <button
    className={
      css`
    padding: 16px 24px;
    background-color: ${colorS};
    font-size: 24px;
    font-weight: 600;
    border-radius: 0;`
    }
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default BaseButton;
