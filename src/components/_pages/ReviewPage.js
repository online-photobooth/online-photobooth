import React from 'react';
import Polaroid from '../picture/Polaroid';
import axios from 'axios';
import RegularButton from '../buttons/RegularButton';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';

class ReviewPage extends React.Component {   
    constructor (props) {
        super(props);
        this.state = {
            img: '',
        };
    }

    componentWillMount = () => {
        this.setState({ img: this.props.location.state.picture });
    }
  
    componentDidMount = () => {
        if (!this.props.location.state || !this.props.location.state.album) 
        {
            this.props.history.push('/album')
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    uploadPicture = async () => {
        try 
        {
            this.props.history.push('/final', { album: this.props.location.state.album })
            const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadLastImageTaken`, {
                token: this.props.accessToken,
                album: this.props.location.state.album.id,
            });
            
            console.log(resp);
            
            if (resp.status === 200) 
            {
                this.props.history.push('/final', { album: this.props.location.state.album })
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

    render = () => {
        return (
            <div className='ReviewPage'>
                <div className="wrapper">
                    <div className="content">
                        <div className="img_container">
                            <img src={ this.state.img } alt="Taken by our photobooth."/>
                        </div>

                        <div className="button_container">
                            <RegularButton
                                size='small'
                                img='refresh'
                                title='Opnieuw'
                                onClick={ this.goBack }
                            />

                            <RegularButton
                                size='small'
                                img='check'
                                title='Oke!'
                                onClick={ this.uploadPicture }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  accessToken: state.accessToken
});
export default connect(mapStateToProps)(ReviewPage);