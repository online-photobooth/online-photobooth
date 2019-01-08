import React from 'react';

class CaptureButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    }
    
    onClick = () => {
        this.setState({ isClicked: true })
        this.props.onClick()
    }
    
    render = () => {
        return (
            <button className={ `CaptureButton ${ this.state.isClicked ? 'clicked' : '' }` } onClick={ this.onClick }>
                <i className="fas fa-camera-retro"></i>
            </button>
        )
    }
}

export default CaptureButton;