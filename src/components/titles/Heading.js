import React from 'react';

const Heading = ({ type, children, className }) => (
  <h1 className={`Heading ${type} ${className || ''}`}>{children}</h1>
);

export default Heading;
