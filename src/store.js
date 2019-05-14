import { createStore } from 'redux';

const initialState = {
  accessToken: JSON.parse(localStorage.getItem('accessToken')) || '',
  googleUser: JSON.parse(localStorage.getItem('googleUser')) || {},
  frames: JSON.parse(localStorage.getItem('frames')) || [],
  frame: JSON.parse(localStorage.getItem('frame')) || {},
  album: JSON.parse(localStorage.getItem('album')) || {},
  format: JSON.parse(localStorage.getItem('format')) || '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_ACCESS_TOKEN':
    localStorage.setItem('accessToken', JSON.stringify(action.payload));

    return {
      ...state,
      accessToken: action.payload,
    };
  case 'SET_GOOGLE_USER':
    localStorage.setItem('googleUser', JSON.stringify(action.payload));

    return {
      ...state,
      googleUser: action.payload,
    };
  case 'SET_FRAMES':
    localStorage.setItem('frames', JSON.stringify(action.payload));

    return {
      ...state,
      frames: action.payload,
    };
  case 'SET_FRAME':
    localStorage.setItem('frame', JSON.stringify(action.payload));

    return {
      ...state,
      frame: action.payload,
    };
  case 'SET_FORMAT':
    localStorage.setItem('format', JSON.stringify(action.payload));

    return {
      ...state,
      format: action.payload,
    };
  case 'SET_ALBUM':
    localStorage.setItem('album', JSON.stringify(action.payload));

    return {
      ...state,
      album: action.payload,
    };
  default:
    return state;
  }
}

const store = createStore(reducer);

export default store;
