import React from 'react';
// import Logo from '../../assets/img/KdG.png';

class Footer extends React.Component {
  renderFooter = () => {
    if (window.location.pathname === '/preview' || window.location.pathname === '/review' || window.location.pathname === '/final') {
      return '';
    }

    return (
      <div>
        <p>KdG mag deze foto’s gebruiken op al haar communicatiekanalen. </p>
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
