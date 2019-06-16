import React, { useEffect } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import Heading from '../titles/Heading';
import RegularButton from '../buttons/RegularButton';

const SelectFilterPage = ({ dispatch, history, filters }) => {
  useEffect(() => {
    console.log('TCL: SelectFilterPage -> filters', filters);
    if (filters.length < 1) {
      dispatch({
        type: 'SET_FILTER',
        payload: false,
      });
      history.push('/preview');
    }
  });
  const setFilter = async (filter) => {
    await dispatch({
      type: 'SET_FILTER',
      payload: filter,
    });
    history.push('/preview');
  };

  const renderImages = () => filters.map(filter => (
    <RegularButton title={filter} size="large" key={filter} onClick={() => setFilter(filter)} type="button" className={css`margin-right: 24px;`}>
      <img src={`/images/filters/${filter}.png`} alt="Filter" />
    </RegularButton>
  ));

  return (
    <div>
      <div className="wrapper">
        <div className="content">
          <Heading type="heading--3">Choose your filter</Heading>

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

const mapStateToProps = state => ({
  filters: state.settings.filters,
});

export default connect(mapStateToProps)(SelectFilterPage);
