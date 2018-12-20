import React from 'react';

class ReviewPage extends React.Component {   
    componentWillMount = () => {
        console.log(this.props.location.state.picture);
    }

    render = () => {
        return (
            <div className='ReviewPage'>
                <img src={ this.props.location.state.picture } alt=""/>
            </div>
        )
    }
}

export default ReviewPage;