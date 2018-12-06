import React from 'react';
import { Link } from 'react-router-dom';

class RegularButton extends React.Component {
    render = () => {
        return (
            <Link to='/prepare' className='RegularButtonLink'>
                <div className={ `RegularButton ${ this.props.size }` }>
                    <img src={ `./style/img/${ this.props.img }.png` } alt="test"/>
                    <h3>{ this.props.title }</h3>
                </div>
            </Link>
        )
    }
}

export default RegularButton;