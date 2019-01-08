import React from 'react';

const Heading = (props) => {
    return (
        <h1 className={ `Heading ${ props.type }` }>{ props.children }</h1>
    );
}

export default Heading