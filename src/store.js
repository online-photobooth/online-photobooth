import { createStore } from 'redux';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || '',
  googleUser: localStorage.getItem('googleUser') || {},
  frames: localStorage.getItem('frames') || [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_ACCESS_TOKEN':
    localStorage.setItem('accessToken', action.payload);

    return {
      ...state,
      accessToken: action.payload,
    };
  case 'SET_GOOGLE_USER':
    localStorage.setItem('googleUser', action.payload);

    return {
      ...state,
      googleUser: action.payload,
    };
  case 'SET_FRAMES':
    localStorage.setItem('frames', action.payload);

    return {
      ...state,
      frames: action.payload,
    };
  default:
    return state;
  }
}

const store = createStore(reducer);

export default store;
