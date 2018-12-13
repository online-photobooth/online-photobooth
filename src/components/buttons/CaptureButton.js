import React from 'react';

class CaptureButton extends React.Component {
    onClick = () => {
        this.props.onClick()
    }
    
    render = () => {
        return (
            <button className='CaptureButton' onClick={ this.onClick }>
                <i className="fas fa-camera-retro"></i>
            </button>
        )
    }
}

export default CaptureButton;