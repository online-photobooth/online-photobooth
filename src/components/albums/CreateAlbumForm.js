import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Heading from '../titles/Heading';
import BaseButton from '../buttons/BaseButton';

const CreateAlbumForm = ({ accessToken, history, dispatch }) => {
  const [newAlbum, setNewAlbum] = useState('');

  async function createNewAlbum(e) {
    e.preventDefault();
    if (newAlbum === '') return false;

    let newAlbumResponse;

    // CREATE ALBUM
    try {
      newAlbumResponse = await axios({
        method: 'POST',
        url: 'https://photoslibrary.googleapis.com/v1/albums',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
        data: {
          album: { title: newAlbum },
        },
      });
      console.log(newAlbumResponse);
    } catch (error) {
      console.log('Creating album went wrong');
      console.log(error.response);
    }

    // SHARE ALBUM
    try {
      const shareAlbumResponse = await axios({
        method: 'POST',
        url: `https://photoslibrary.googleapis.com/v1/albums/${newAlbumResponse.data.id}:share`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
        data: {
          sharedAlbumOptions: {
            isCollaborative: 'false',
            isCommentable: 'false',
          },
        },
      });

      console.log(shareAlbumResponse);
      const selectedAlbum = {
        ...newAlbumResponse.data,
        ...shareAlbumResponse.data,
      };
      console.log(selectedAlbum);

      dispatch({
        type: 'SET_ALBUM',
        payload: selectedAlbum,
      });

      history.push('/');
    } catch (error) {
      console.log('Sharing album went wrong');
      console.log(error.response);
    }

    return true;
  }

  return (
    <form onSubmit={e => createNewAlbum(e)}>
      <Heading
        type="heading--3"
      >
        Of maak een nieuw album aan
      </Heading>
      <div
        className={css`
                  display: flex;
                `}
      >
        <input
          className={css`
                  border-radius: 0;
                  padding: 4px;
                  flex: 1 1 auto;
                  border: 1px solid black;
                  margin-right: 12px;
                  font-size: 24px;
                `}
          name="newAlbum"
          value={newAlbum}
          onChange={e => setNewAlbum(e.target.value)}
        />

        <BaseButton type="submit">
          Aanmaken
        </BaseButton>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  accessToken: state.accessToken,
});

export default connect(mapStateToProps)(CreateAlbumForm);
