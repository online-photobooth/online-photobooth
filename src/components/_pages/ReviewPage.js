import React from 'react';
import Polaroid from '../picture/Polaroid';
import axios from 'axios';

class ReviewPage extends React.Component {   
    constructor (props) {
        super(props);
        this.state = {
            img: 'data:image/png;base64,' + this.props.location.state.picture,
        };
    }
    
    componentWillMount = () => {
        console.log(this.props.location.state.picture);
    }

    upload = () => {
        axios.post('http://10.6.101.1:8888/uploadLastImageTaken')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render = () => {
        return (
            <div className='ReviewPage'>
                <Polaroid image={ this.state.img }/>
                <button onClick={ this.upload }>Upload</button>
            </div>
        )
    }
}

export default ReviewPage;