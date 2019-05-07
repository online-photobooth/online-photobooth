import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../titles/Heading';

const RegularButton = ({
  link, size, img, title, onClick,
}) => {
  if (link !== undefined) {
    return (
      <Link to={`/${link}`} className="RegularButtonLink">
        <div className={`RegularButton ${size}`}>
          <img src={`./style/img/${img}.png`} alt="test" />
          <Heading type="heading--4">{ title }</Heading>
        </div>
      </Link>
    );
  }

  return (
    <button className={`RegularButton ${size}`} onClick={onClick} type="button">
      <img src={`./style/img/${img}.png`} alt="test" />
      <Heading type="heading--4">{ title }</Heading>
    </button>
  );
};

export default RegularButton;
