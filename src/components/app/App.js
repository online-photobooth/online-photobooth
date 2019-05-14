import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../footer/Footer';
import Triangles from './Triangles';

// Pages
import StartPage from '../_pages/StartPage';
import PreviewPage from '../_pages/PreviewPage';
import ShowPicturePage from '../_pages/ReviewPage';
import LoginPage from '../_pages/LoginPage';
import SelectAbumPage from '../_pages/SelectAlbumPage';
import SelectFramePage from '../_pages/SelectFramePage';
import FinalPage from '../_pages/FinalPage';
import EmailPage from '../_pages/EmailPage';
import PrivacyPage from '../_pages/PrivacyPage';

const App = () => (
  <div className="App">
    <Route exact path="/" component={StartPage} />
    <Route exact path="/frame" component={SelectFramePage} />
    <Route exact path="/preview" component={PreviewPage} />
    <Route exact path="/review" component={ShowPicturePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/album" component={SelectAbumPage} />
    <Route exact path="/final" component={FinalPage} />
    <Route exact path="/email" component={EmailPage} />
    <Route exact path="/privacy" component={PrivacyPage} />

    <Footer />

    <Triangles />

  </div>
);

export default App;
