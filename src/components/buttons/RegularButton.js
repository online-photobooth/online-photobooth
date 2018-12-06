import React from 'react';

class RegularButton extends React.Component {
    render = () => {
        return (
            <div className={ `RegularButton ${ this.props.size }` }>
                <img src={ `./style/img/${ this.props.img }.png` } alt="test"/>
                <h3>{ this.props.title }</h3>
            </div>
        )
    }
}

export default RegularButton;