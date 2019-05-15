import React from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import Heading from '../titles/Heading';
import RegularButton from '../buttons/RegularButton';

class FinalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: '',
      emailsAreValid: true,
      emailIsSending: false,
      emailIsSend: false,
      errorSendingEmail: false,
    };
  }

  componentDidMount = () => {
    const { album, history } = this.props;

    if (!album) {
      history.push('/album');
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendEmail = async (e) => {
    const { album, accessToken } = this.props;
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
          title: album.title,
          email: e.target.emails.value,
          albumLink: album.shareInfo.shareableUrl,
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

  render = () => {
    const {
      emails, emailsAreValid, emailIsSending,
    } = this.state;
    const {
      history, album,
    } = this.props;

    return (
      <div className="FinalPage">
        <div className="wrapper">
          <div className="flex justify-between items-end" style={{ minWidth: '70vw' }}>
            <div className="flex flex-col justify-between items-center h-30">
              <Heading type="small">Foto in je mailbox?</Heading>
              <p>Meer email adressen? Gebruik (;)</p>
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

                <label htmlFor="emails">{emailsAreValid ? '' : 'Controleer of alle e-mail adressen juist zijn ingevuld.'}</label>
                <button className={emailIsSending ? 'sending' : ''} type="submit">
                  {this.renderButtonContent()}
                </button>
              </form>
            </div>

            { album && album.shareInfo && (
              <div className="flex flex-col justify-between items-center h-30">
                <Heading type="small">Foto via QR?</Heading>
                <div className="mt-4">
                  <QRCode value={album.shareInfo.shareableUrl} />
                </div>
              </div>
            )}
            <div className="flex justify-center items-center h-30">
              <RegularButton
                img="home"
                alt="House icon."
                size="large"
                onClick={() => history.push('/')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  album: state.album,
});

export default connect(mapStateToProps)(FinalPage);
