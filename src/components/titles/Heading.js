import React from 'react';

const Heading = ({ type, children }) => (
  <h1 className={`Heading ${type}`}>{ children }</h1>
);

export default Heading;
