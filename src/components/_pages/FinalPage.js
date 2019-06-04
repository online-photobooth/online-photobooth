import React from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { connect } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { css } from 'emotion';
import Heading from '../titles/Heading';
import RegularButton from '../buttons/RegularButton';
import BaseButton from '../buttons/BaseButton';

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

    return 'Stuur';
  }

  render = () => {
    const {
      emails, emailsAreValid, emailIsSending,
    } = this.state;
    const {
      history, album,
    } = this.props;

    return (
      <div className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
      `}
      >
        <div className={css`
            width: 70vw;
            display: flex;
            flex-direction: column;
            align-items: space-between;
          `}
        >
          <Heading type="heading--3">Hoe wil je je foto ontvangen?</Heading>
          { album && album.shareInfo && (
            <div className={css`
            width: 70vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          `}>
              <div className={css`
                  display: flex;
                  justify-content: space-around;
                  width: 100%;
                  margin-top: 16px;
                `}
              >
                <RegularButton title="Per mail" size="large" img="camera" />
                <RegularButton title="Via QRcode" size="large">
                  <QRCode
                    value={album.shareInfo.shareableUrl}
                    size={156}
                  />
                </RegularButton>
              </div>
            </div>
          )}

          <div className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 40px;
            `}
          >
            <div>
              <form onSubmit={e => this.sendEmail(e)}>
                <div className={css`
                    display: flex;
                  `}
                >
                  <input
                    name="emails"
                    id="emails"
                    onChange={e => this.onChangeHandler(e)}
                    value={emails}
                    className={css`
                      border-radius: 0;
                      padding: 4px;
                      flex: 1 1 auto;
                      border: 1px solid black;
                      margin-right: 12px;
                      font-size: 24px;
                    `}
                    onFocus={this.onInputClick}
                    autoComplete="off"
                  />
                  <div className={css``}>
                    <BaseButton className={emailIsSending ? 'sending' : ''} type="submit">
                      {this.renderButtonContent()}
                    </BaseButton>
                  </div>
                </div>

                <label htmlFor="emails">{emailsAreValid ? '' : 'Controleer of alle e-mail adressen juist zijn ingevuld.'}</label>

              </form>
              <p>Meerdere mailadressen? Scheid ze met ;</p>

            </div>

            <RegularButton
              img="home"
              alt="House icon."
              size="small"
              onClick={() => history.push('/')}
            />
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
