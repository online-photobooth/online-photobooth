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
      const title = `Welkom op de ${location.state ? location.state.album.title : ''}!`;

      return (
        <div className="StartPage">
          <div className="wrapper">
            <div className="content">
              <Heading>{title}</Heading>
              <div className="flex">
                <div
                  className="mr-2"
                >
                  <RegularButton
                    img="camera"
                    alt="Take a single picture."
                    size="large"
                    title="Neem 1 foto."
                    onClick={() => history.push('/preview', { album: location.state.album, option: 'single' })}
                  />
                </div>
                <RegularButton
                  img="camera"
                  alt="Take a single picture."
                  size="large"
                  title="Neem een Gif."
                  onClick={() => history.push('/preview', { album: location.state.album, option: 'gif' })}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default StartPage;
