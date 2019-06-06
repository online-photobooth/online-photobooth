import React from 'react';

const SingleAlbum = ({ album, onClick }) => {
  return (
    <div className="SingleAlbum">
      <h3>{ album.title }</h3>
      <button onClick={() => onClick(album)}>SELECTEER ALBUM</button>
    </div>
  );
};

export default SingleAlbum;
