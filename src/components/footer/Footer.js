import React from 'react';
import Logo from '../../assets/img/KdG.png';

class Footer extends React.Component {
    renderFooter = () => {
        if (!(window.location.pathname === '/preview'))
        {
            return (
                <div>
                    <img src={ Logo } alt="Logo van Karel de Grote Hogeschool."/>
                    <p>Wanneer ik een foto neem accepteer ik dat deze wordt geüpload op de website van kdg.be</p>
                </div>
            )
        }
    } 
    
    render = () => {
        return (
            <div className='Footer'>
                { this.renderFooter() }
            </div>
        )
    }
}

export default Footer;