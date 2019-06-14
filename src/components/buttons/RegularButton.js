import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';

const RegularButton = ({
  link, size, img, title, onClick, text, className, children, colors,
}) => {
  const renderImage = <img src={`./images/icons/${img}.png`} alt="" className={css`width: ${size === 'small' ? '70%' : '60%'};`} />;
  const renderText = <span className="Heading heading--0 m-0">{text}</span>;

  if (link !== undefined) {
    return (
      <Link to={`/${link}`} className="RegularButtonLink">
        <div className={`RegularButton ${size}`}>
          <img src={`./images/icons/${img}.png`} className={css`width: ${size === 'small' ? '70%' : '60%'};`} alt="" />
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
      <button
        className={css` 
        background-color: ${colors.secondary}; 
        border-radius: 200rem; 
        border: none;
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        color: #fff; 
        width: ${size === 'small' ? '120px' : '250px'};
        height: ${size === 'small' ? '120px' : '250px'};
       `}
        onClick={onClick}
        type="button"
      >
        {img && renderImage}
        {text && renderText}
        {children}
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
const mapStateToProps = state => ({
  colors: state.settings.colors,
});

export default connect(mapStateToProps)(RegularButton);
