import React from 'react';

const SingleAlbum = (props) => {
    const { album }     = props;
    console.log(props);
    return (
        <div className='SingleAlbum'>
            <h3>{ album.title }</h3>
            <button onClick={ () => props.onClick(album) }>
                SELECTEER ALBUM
            </button>
        </div>
    );
}

export default SingleAlbum