import React from 'react';
import Webcam from "react-webcam";

class PreviewPage extends React.Component {
    render = () => {
        return (
            <div className='PreviewPage'>
                <Webcam 
                    width='100%'
                    height='100%'
                    audio={ false }
                />
            </div>
        )
    }
}

export default PreviewPage;