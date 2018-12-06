import React from 'react';

const Heading = (props) => {
    return (
        <div className='Heading'>
            <h1>{ props.children }</h1>
        </div>
    );
}

export default Heading