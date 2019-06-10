import React from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';
import RegularButton from '../buttons/RegularButton';

const SelectFramePage = ({ dispatch, history }) => {
  const filters = [
    {
      name: '#NoFilter',
      filter: 'normal',
      image: 'original.png',
    },
    {
      name: 'Valencia',
      filter: 'valencia',
      image: 'valencia.png',
    },
    {
      name: 'Juno',
      filter: 'juno',
      image: 'juno.png',
    },
    {
      name: 'Inkwell',
      filter: 'inkwell',
      image: 'inkwell.png',
    },
  ];

  const setFilter = async (filter) => {
    await dispatch({
      type: 'SET_FILTER',
      payload: filter,
    });
    history.push('/preview');
  };

  const renderImages = () => filters.map(filter => (
    <RegularButton title={filter.name} size="large" key={filter.name} onClick={() => setFilter(filter.filter)} type="button" className={css`margin-right: 24px;`}>
      <img src={`/images/filters/${filter.image}`} alt="Kdg Filter" />
    </RegularButton>
  ));

  return (
    <div className="SelectAlbumPage">
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--3">Kies je Filter</Heading>

          <div className={css`
            display: flex;
            justify-content: space-between;
            max-width: 100vw;
          `}
          >
            {filters && renderImages()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(SelectFramePage);
