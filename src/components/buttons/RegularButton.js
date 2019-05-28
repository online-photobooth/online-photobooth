import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import Heading from '../titles/Heading';

const RegularButton = ({
  link, size, img, title, onClick,
}) => {
  if (link !== undefined) {
    return (
      <Link to={`/${link}`} className="RegularButtonLink">
        <div className={`RegularButton ${size}`}>
          <img src={`./style/img/${img}.png`} alt="test" />
          <Heading type="heading--4">{title}</Heading>
        </div>
      </Link>
    );
  }

  return (
    <div className={css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    `}
    >
      <button className={`RegularButton ${size}`} onClick={onClick} type="button">
        <img src={`./style/img/${img}.png`} alt="test" style={{ marginBottom: title ? '1.2rem' : '0' }} />
      </button>
      <span className={css`
        font-size: 32px;
        font-weight: 600;
        margin-top: 24px; 
        text-align: center;
      `}
      >
        {title}
      </span>
    </div>
  );
};

export default RegularButton;
