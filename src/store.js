import { createStore } from 'redux';

const initialState = {
  accessToken: '',
  googleUser: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      };
    case 'SET_GOOGLE_USER':
      return {
        ...state,
        googleUser: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
