import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import T0 from '../../assets/img/Triangle_0.png';
import T1 from '../../assets/img/Triangle_1.png';
import T2 from '../../assets/img/Triangle_2.png';
import T3 from '../../assets/img/Triangle_3.png';
import Footer from '../footer/Footer';

// Pages
import StartPage from '../_pages/StartPage';
import PreviewPage from '../_pages/PreviewPage';
import ShowPicturePage from '../_pages/ReviewPage';
import LoginPage from '../_pages/LoginPage';
import SelectAbumPage from '../_pages/SelectAlbumPage';
import FinalPage from '../_pages/FinalPage';
import EmailPage from '../_pages/EmailPage';
import PrivacyPage from '../_pages/PrivacyPage';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path="/" 			component={ StartPage } />
				<Route exact path="/preview" 	component={ PreviewPage } />
				<Route exact path="/review" 	component={ ShowPicturePage } />
				<Route exact path="/login" 	  	component={ LoginPage } />
				<Route exact path="/album" 	  	component={ SelectAbumPage } />
				<Route exact path="/final" 	  	component={ FinalPage } />
				<Route exact path="/email" 	  	component={ EmailPage } />
				<Route exact path="/privacy" 	  	component={ PrivacyPage } />

				<Footer />
				
				<div className="triangles">
					<img className='t0' src={ T0 } alt="Triangle in the upperleft corner."/>
					<img className='t1' src={ T1 } alt="Triangle in the upperright corner."/>
					<img className='t2' src={ T2 } alt="Triangle in the bottomright corner."/>
					<img className='t3' src={ T3 } alt="Triangle in the bottomleft corner."/>
				</div>
			</div>
		);
	}
}

export default App;
