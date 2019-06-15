import React from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';

const Footer = ({ content }) => (
  <div className={css`
    position: absolute; 
    bottom: 0;
    width: 100%;
    padding-bottom: 2rem;
    display: flex;
    justify-content: center;
    `}
  >
    <div className={css`
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.1em;
      `}
    >
      <p>
        <span>{content}</span>
      </p>
    </div>
  </div>
);

const mapStateToProps = state => ({
  content: state.settings.text.footer,
});

export default connect(mapStateToProps)(Footer);
