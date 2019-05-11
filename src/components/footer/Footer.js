import React from 'react';
// import Logo from '../../assets/img/KdG.png';

class Footer extends React.Component {
  renderFooter = () => {
    if (window.location.pathname === '/preview' || window.location.pathname === '/review' || window.location.pathname === '/final') {
      return '';
    }

    return (
      <div>
        <p>Wanneer ik een foto neem accepteer ik dat deze wordt geüpload op de website van kdg.be</p>
      </div>
    );
  }

  render = () => (
    <div className="Footer">
      {this.renderFooter()}
    </div>
  )
}

export default Footer;
