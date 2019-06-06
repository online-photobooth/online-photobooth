import React from 'react';
import { css } from 'emotion';
import { colorS } from '../../assets/variables';

const BaseButton = ({ onClick, type = 'button', children }) => (
  <button
    className={
      css`
    padding: 20px 28px;
    background-color: ${colorS};
    font-size: 32px;
    font-weight: 600;
    font-family: 'Proxima Nova', sans-serif;
    border-radius: 0;
    border: none;
    box-shadow: 0px 0.5px 1px 0px rgba(29,29,27,0.75);
    `}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default BaseButton;
