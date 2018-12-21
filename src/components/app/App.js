import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StartPage from '../_pages/StartPage';
import PreviewPage from '../_pages/PreviewPage';
import T0 from '../../assets/img/Triangle_0.png';
import T1 from '../../assets/img/Triangle_1.png';
import T2 from '../../assets/img/Triangle_2.png';
import T3 from '../../assets/img/Triangle_3.png';
import Footer from '../footer/Footer';
import ShowPicturePage from '../_pages/ReviewPage';
import LoginPage from '../_pages/LoginPage';
import SelectAbumPage from '../_pages/SelectAlbumPage';
import FinalPage from '../_pages/FinalPage';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path="/" 			component={ StartPage } />
				<Route exact path="/preview" 	component={ PreviewPage } />
				<Route exact path="/review" 	component={ ShowPicturePage } />
				<Route exact path="/login" 	component={ LoginPage } />
				<Route exact path="/album" 	component={ SelectAbumPage } />
				<Route exact path="/final" 	component={ FinalPage } />

				<Footer />
				
				<div className="triangles">
					<img className='t0' src={ T0 } alt="Traingle in the upperleft corner."/>
					<img className='t1' src={ T1 } alt="Traingle in the upperright corner."/>
					<img className='t2' src={ T2 } alt="Traingle in the bottomright corner."/>
					<img className='t3' src={ T3 } alt="Traingle in the bottomleft corner."/>
				</div>
			</div>
		);
	}
}

export default App;
