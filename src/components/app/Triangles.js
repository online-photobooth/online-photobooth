import React from 'react';

import T0 from '../../assets/img/Triangle_0.png';
import T1 from '../../assets/img/Triangle_1.png';
import T2 from '../../assets/img/Triangle_2.png';
import T3 from '../../assets/img/Triangle_3.png';

const Triangles = () => {
  if (window.location.pathname === '/preview' || window.location.pathname === '/review') {
    return '';
  }

  return (
    <div className="triangles">
      <img className="t0" src={T0} alt="Triangle in the upperleft corner." />
      <img className="t1" src={T1} alt="Triangle in the upperright corner." />
      <img className="t2" src={T2} alt="Triangle in the bottomright corner." />
      <img className="t3" src={T3} alt="Triangle in the bottomleft corner." />
    </div>
  );
};

export default Triangles;
