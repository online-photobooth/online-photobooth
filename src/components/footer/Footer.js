import React from 'react';
import { css } from 'emotion';

class Footer extends React.Component {
  renderFooter = () => (
    <div className={css`
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.1em;
      `}
    >
      <p>KdG mag deze foto’s gebruiken op al haar communicatiekanalen. </p>
    </div>
  )

  render = () => (
    <div className={css`
    position: absolute; 
    bottom: 0;
    width: 100%;
    padding-bottom: 2rem;
    display: flex;
    justify-content: center;
    `}
    >
      {this.renderFooter()}
    </div>
  )
}

export default Footer;
