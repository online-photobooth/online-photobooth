import React from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import Keyboard from 'react-simple-keyboard';
import Heading from '../titles/Heading';
import RegularButton from '../buttons/RegularButton';
import 'react-simple-keyboard/build/css/index.css';

class FinalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: '',
      emailsAreValid: true,
      emailIsSending: false,
      emailIsSend: false,
      errorSendingEmail: false,
      layoutName: 'default',
      input: '',
      keyBoardIsOpen: false,
      divClicked: false,
    };
  }

  componentDidMount = () => {
    const { location, history } = this.props;

    if (!location.state || !location.state.album) {
      history.push('/album');
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendEmail = async (e) => {
    const { location, accessToken } = this.props;
    const { emailsAreValid } = this.state;

    e.preventDefault();
    console.log('Sending mail!');

    let emails = [];

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

    emails = e.target.emails.value.split(';').map(email => email.trim());

    console.log(emails);

    for (let i = 0, ilen = emails.length; i < ilen; i += 1) {
      console.log(reg.test(String(emails[i]).toLowerCase()));

      console.log('OK');

      if (!(reg.test(String(emails[i]).toLowerCase()))) {
        this.setState({ emailsAreValid: false });
      } else {
        this.setState({ emailsAreValid: true });
      }
    }

    console.log('Are emails valid?', emailsAreValid);

    if (emailsAreValid) {
      this.setState({ emailIsSending: true });

      try {
        const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendPictureToEmail`, {
          token: accessToken,
          title: location.state.album.title,
          email: e.target.emails.value,
          albumLink: location.state.album.shareInfo.shareableUrl,
        });

        if (resp.status === 200) this.setState({ emailIsSending: false, emailIsSend: true, errorSendingEmail: false });
      } catch (error) {
        console.log('Send Email', error.response);
        this.setState({ emailIsSending: false, emailIsSend: false, errorSendingEmail: true });
      }
    }
  }

  renderButtonContent = () => {
    const {
      emailIsSend, requestIsSend, emailIsSending, errorSendingEmail,
    } = this.state;

    if (emailIsSending) {
      return (
        <SyncLoader
          color="#fff"
          size={10}
          loading={requestIsSend}
        />
      );
    }
    if (errorSendingEmail) {
      return 'Er is iets fout gegaan bij het versturen van je email';
    }

    if (emailIsSend) {
      return 'Verzenden voltooid!';
    }

    return "Verstuur foto's";
  }

  onKeyPress = (button) => {
    console.log(button);
  }

    onKeyboardChange = (input) => {
      this.setState({ input });
      console.log('Input changed', input);
    }

  onInputClick = () => {
    this.setState({ keyBoardIsOpen: true });
  }

  onKeyBoardExit = () => {
    this.setState({ keyBoardIsOpen: false });
  }

  render = () => {
    const {
      keyBoardIsOpen, emails, emailsAreValid, emailIsSending, layoutName,
    } = this.state;
    const {
      location, history,
    } = this.props;

    return (
      <div className={`FinalPage ${keyBoardIsOpen ? 'open' : 'close'} `} onClick={this.onKeyBoardExit} role="button" tabIndex="0">
        { <div className={`checkInputOverlay ${keyBoardIsOpen ? 'open' : 'close'}`} onClick={this.onKeyBoardExit} role="button" tabIndex="0" /> }
        <div className="wrapper">
          <div className="flex_container">
            <div className="left">
              <Heading>Je foto is verstuurd! Bekijk het album via de QR-code!</Heading>
              <QRCode value={location.state.album.shareInfo.shareableUrl} />
            </div>

            <div className="right">
              <div className="buttons">
                <RegularButton
                  img="camera"
                  alt="Large green button with camera icon in it."
                  size="small"
                  title="Neem een nieuwe foto"
                  onClick={() => history.push('/', { album: location.state.album })}
                />

                <RegularButton
                  img="home"
                  alt="Large green button with camera icon in it."
                  size="small"
                  title="Afsluiten"
                  onClick={() => history.push('/', { album: location.state.album })}
                />
              </div>
              <Heading>Wil je de foto in je mailbox ontvangen?</Heading>

              <p>Geef meerdere e-mail adressen op gescheiden door een puntkomma (;)</p>

              <form onSubmit={e => this.sendEmail(e)}>
                <input
                  name="emails"
                  id="emails"
                  placeholder="email@example.com; email_2@example.com"
                  onChange={e => this.onChangeHandler(e)}
                  value={emails}
                  className={emailsAreValid ? '' : 'error'}
                  onFocus={this.onInputClick}
                  autoComplete="off"
                />

                <label htmlFor="emails">{ emailsAreValid ? '' : 'Controleer of alle e-mail adressen juist zijn ingevuld.' }</label>
                <button className={emailIsSending ? 'sending' : ''} type="submit">
                  { this.renderButtonContent() }
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="keyboard_container">
          { <Keyboard
            className="test"
            ref={r => this.keyboard = r}
            layoutName={layoutName}
            onChange={input => this.onKeyboardChange(input)}
            onKeyPress={this.onKeyPress}
          /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.accessToken,
});

export default connect(mapStateToProps)(FinalPage);
