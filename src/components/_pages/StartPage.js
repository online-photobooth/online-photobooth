import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

class StartPage extends React.Component {
    componentDidMount = () => {
      const { location, history } = this.props;
      if (!location.state || !location.state.album) {
        history.push('/album');
      }
    }

    render = () => {
      const { location, history } = this.props;

      return (
        <div className="StartPage">
          <div className="wrapper">
            <div className="content">
              <Heading>
                              Welkom op de
                {' '}
                { location.state ? location.state.album.title : ''}
  !
              </Heading>
              <RegularButton
                img="camera"
                alt="Large green button with camera icon in it."
                size="large"
                title="Druk om verder te gaan."
                onClick={() => history.push('/preview', { album: location.state.album })}
              />
            </div>
          </div>
        </div>
      );
    }
}

export default StartPage;
