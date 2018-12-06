import React from 'react';
import Logo from '../../assets/img/KdG.png';

const Footer = (props) => {
    return (
        <div className='Footer'>
            <img src={ Logo } alt="Logo van Karel de Grote Hogeschool."/>
            <p>Wanneer ik een foto neem accepteer ik dat deze wordt geüpload op de website van kdg.be</p>
        </div>
    );
}

export default Footer