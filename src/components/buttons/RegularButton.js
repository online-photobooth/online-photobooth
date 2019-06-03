import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import Heading from '../titles/Heading';

const RegularButton = ({
  link, size, img, title, onClick, text, className,
}) => {
  const renderImage = <img src={`./images/icons/${img}.png`} alt="" />;
  const renderText = <span className="Heading heading--0 m-0">{text}</span>;

  if (link !== undefined) {
    return (
      <Link to={`/${link}`} className="RegularButtonLink">
        <div className={`RegularButton ${size}`}>
          <img src={`./images/icons/${img}.png`} alt="" />
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
    ${className}
    `}
    >
      <button className={`RegularButton ${size}`} onClick={onClick} type="button">
        {img && renderImage}
        {text && renderText}
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
