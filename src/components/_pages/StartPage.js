import React from 'react';
import RegularButton from '../buttons/RegularButton';
import Heading from '../titles/Heading';

class StartPage extends React.Component {
    render = () => {
        return (
            <div className='StartPage'>
                <div className="wrapper">
                    <div className='left'>
                        <Heading>Welkom op de KdG opencampusdag!</Heading>
                    </div>

                    <div className='right'>
                        <RegularButton 
                            img='camera' 
                            alt='Large green button with camera icon in it.' 
                            size='large' 
                            title='Druk om verder te gaan.'
                            link='preview'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default StartPage;