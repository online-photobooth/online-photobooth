import React from 'react';
import Logo from '../../assets/img/KdG.png';

const Polaroid = ({ img }) => (
  <div className="Polaroid">
    <img src={img} alt="Taken by our photobooth!" />
    <h3>Opencampusdag 2019</h3>
    <p>photobooth.kdg.be</p>
    <img className="logo" src={Logo} alt="Logo van Karel de Grote Hogeschool." />
  </div>
);

export default Polaroid;
