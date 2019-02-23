import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class FinalPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            emails: '',
            emails_are_valid: true,
            email_is_sending: false,
            email_is_send: false,
            error_sending_email: false,
            layoutName: "default",
            input: "",
            keyBoardIsOpen: false,
            divClicked: false,
        };
    }

    componentDidMount = () => {
        if(!this.props.location.state || !this.props.location.state.album) 
        {
            this.props.history.push('/album')
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendEmail = async (e) => {
        e.preventDefault()
        console.log('Sending mail!');

        let emails                = [];
        let emails_are_valid      = true;

        const reg     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        emails    = e.target.emails.value.split(';').map((email) => {
            return email.trim();
        });

        console.log(emails);

        for (let i = 0, ilen = emails.length; i < ilen; i++)
        {
            console.log(reg.test(String(emails[i]).toLowerCase()));

            console.log('OK');

            if (!(reg.test(String(emails[i]).toLowerCase())))
            {
                emails_are_valid   = false;
                this.setState({ emails_are_valid: false })
            }
            else 
            {
                emails_are_valid   = true;
                this.setState({ emails_are_valid: true })
            }
        }

        console.log('Are emails valid?', this.state.emails_are_valid);
        
        if (emails_are_valid)
        {
            this.setState({ email_is_sending: true })

            try 
            {
                const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendPictureToEmail`, {
                    token: this.props.accessToken,
                    title: this.props.location.state.album.title,
                    email: e.target.emails.value,
                    albumLink: this.props.location.state.album.shareInfo.shareableUrl,
                })
                
                if (resp.status === 200) this.setState({ email_is_sending: false, email_is_send: true, error_sending_email: false })
            } 
            catch (error) 
            {
                console.log('Send Email', error.response);
                this.setState({ email_is_sending: false, email_is_send: false, error_sending_email: true })
            }
        }
    }

    renderButtonContent = () => {
        if (this.state.email_is_sending)
        {
            return (
                <SyncLoader
                    color='#fff'
                    size={ 10 }
                    loading={ this.state.requestIsSend }
                /> 
            )
        }
        else if (this.state.error_sending_email)
        {
            return 'Er is iets fout gegaan bij het versturen van je email'
        }
        else 
        {
            if (this.state.email_is_send)
            {
                return "Verzenden voltooid!"
            }
            else 
            {
                return "Verstuur foto's"
            }
        }
    }

    onKeyPress = (button) => {
        console.log(button);
    }

    onKeyboardChange = (input) => {
        this.setState({ input })
    }

    onInputClick = () => {
        this.setState({ keyBoardIsOpen: true })        
    }

    onKeyBoardExit = () => {
        this.setState({ keyBoardIsOpen: false })
    }

    render = () => {
        return (
            <div className={ `FinalPage ${ this.state.keyBoardIsOpen ? 'open' : 'close' } `} onClick={ this.onKeyBoardExit }>
                { <div className={`checkInputOverlay ${ this.state.keyBoardIsOpen ? 'open' : 'close' }`} onClick={ this.onKeyBoardExit }></div> }
                <div className="wrapper">
                    <div className="flex_container">
                        <div className="left">
                            <Heading>Je foto is verstuurd! Bekijk het album via de QR-code!</Heading>
                            <QRCode value={ this.props.location.state.album.shareInfo.shareableUrl } />
                        </div>

                        <div className="right">
                            <div className="buttons">
                                <RegularButton 
                                    img='camera' 
                                    alt='Large green button with camera icon in it.' 
                                    size='small' 
                                    title='Neem een nieuwe foto'
                                    onClick={() => this.props.history.push('/', { album: this.props.location.state.album })}
                                />

                                <RegularButton 
                                    img='home' 
                                    alt='Large green button with camera icon in it.' 
                                    size='small' 
                                    title='Afsluiten'
                                    onClick={() => this.props.history.push('/', { album: this.props.location.state.album })}
                                />
                            </div>
                            <Heading>
                                Wil je de foto in je mailbox ontvangen?
                            </Heading>

                            <p>Geef meerdere e-mail adressen op gescheiden door een puntkomma (;)</p>

                            <form onSubmit={(e) => this.sendEmail(e)}>
                                <input 
                                    name='emails' 
                                    placeholder="email@example.com; email_2@example.com" 
                                    onChange={(e) => this.onChangeHandler(e)} 
                                    value={ this.state.emails } 
                                    className={ this.state.emails_are_valid ? '' : 'error' }
                                    onFocus={ this.onInputClick }
                                    autoComplete='off'
                                />

                                <label htmlFor="emails">{ this.state.emails_are_valid ? '' : 'Controleer of alle e-mail adressen juist zijn ingevuld.' }</label>
                                <button className={ this.state.email_is_sending ? 'sending' : '' } type='submit'>
                                    { this.renderButtonContent() }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='keyboard_container'>
{                     <Keyboard
                        className='test'
                        ref={ r => (this.keyboard = r) }
                        layoutName={ this.state.layoutName }
                        onChange={ this.onKeyboardChange }
                        onKeyPress={ this.onKeyPress }
                    /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  accessToken: state.accessToken
});
export default connect(mapStateToProps)(FinalPage);
