import React from 'react';
import { css } from 'emotion';
import { colorS } from '../../assets/variables';

class Footer extends React.Component {
  renderFooter = () => (
    <div className={css`
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.1em;
      `}
    >
      <p>
        <span>
      Made by the awesome
          <a href="https://jordypereira.be" target="_blank" rel="noopener noreferrer" className={css`color: ${colorS}; text-decoration: none;`}> Jordy Pereira</a>
!
        </span>
      </p>
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
