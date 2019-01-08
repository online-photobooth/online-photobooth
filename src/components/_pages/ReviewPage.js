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
        this.setState({ img: 'data:image/png;base64,' + this.props.location.state.picture });
    }
  
    componentDidMount = () => {
        if (!this.props.location.state || !this.props.location.state.album) 
        {
            this.props.history.push('/album')
        }
    }

    async uploadPicture() {
        try 
        {
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
            console.log(error.response);
        }
    }

/*     upload = () => {
        axios.post('http://10.6.101.1:8888/uploadLastImageTaken')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    } */

    render = () => {
        return (
            <div className='ReviewPage'>
                <div className="wrapper">
                    <div className="content">
                        <div className="img_container">
                            <img src={ this.props.location.state.picture } alt="Taken by our photobooth."/>
                        </div>

                        {/* <div className="button_container">
                            <Heading>Is deze foto goed?</Heading>
                        </div> */}
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