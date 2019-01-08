import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../titles/Heading';

class RegularButton extends React.Component {
    render = () => {
        const { link, size, img, title }    = this.props;

        if (link) 
        {
            return (
                <Link to={ `/${ link }` } className='RegularButtonLink'>
                    <div className={ `RegularButton ${ size }` }>
                        <img src={ `./style/img/${ img }.png` } alt="test"/>
                        <Heading type='heading--4'>{ title }</Heading>
                    </div>
                </Link>
            )
        } 
        else 
        {
            return (
                <div className={ `RegularButton ${ size }` } onClick={ this.props.onClick }>
                    <img src={ `./style/img/${ img }.png` } alt="test"/>
                    <Heading type='heading--4'>{ title }</Heading>
                </div>
            )
        }
    }
}

export default RegularButton;