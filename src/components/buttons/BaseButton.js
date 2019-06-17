import React from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { colorT, colorP } from '../../assets/variables';

const BaseButton = ({
  onClick, type = 'button', children, size = 'large', activated = 'false', colors,
}) => (
  <button
    className={
      css`
    padding: ${size === 'large' ? '20px 28px' : '10px 14px'};
    background-color: ${activated ? ((colors && colors.primary) || colorP) : ((colors && colors.tertiary) || colorT)};
    font-size: ${size === 'large' ? '32px' : '20px'};
    font-weight: 600;
    font-family: 'Proxima Nova', sans-serif;
    border-radius: 0;
    border: none;
    box-shadow: 0px 0.5px 1px 0px rgba(29,29,27,0.75);
    outline: none;
    `}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

const mapStateToProps = state => ({
  colors: state.settings.colors,
});

export default connect(mapStateToProps)(BaseButton);
