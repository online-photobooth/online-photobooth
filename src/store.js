import { createStore } from 'redux';
// import throttle from 'lodash/throttle';
// import { loadState, saveState } from './localStorage';
import { colorP, colorS, colorT } from './assets/variables';

const initialState = {
  accessToken: '',
  googleUser: {},
  frames: [],
  frame: {},
  filter: {},
  album: {},
  format: '',
  expiresAt: '',
  settings: localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {
    camera: 'http://localhost:8888',
    ffmpeg: 'http://localhost:8888',
    canvas: 'http://localhost:8888',
    format: {
      gif: true,
      single: true,
    },
    filters: [],
    colors: {
      primary: colorP,
      secondary: colorS,
      tertiary: colorT,
    },
    text: {
      footer: '',
    },
  },
};

// const persistedState = loadState();

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_ACCESS_TOKEN':
    return {
      ...state,
      accessToken: action.payload,
    };
  case 'SET_EXPIRES_AT':
    return {
      ...state,
      expiresAt: action.payload,
    };
  case 'SET_GOOGLE_USER':
    return {
      ...state,
      googleUser: action.payload,
    };
  case 'SET_FRAMES':
    return {
      ...state,
      frames: action.payload,
    };
  case 'SET_FRAME':
    return {
      ...state,
      frame: action.payload,
    };
  case 'SET_FILTER':
    return {
      ...state,
      filter: action.payload,
    };
  case 'SET_FORMAT':
    return {
      ...state,
      format: action.payload,
    };
  case 'SET_ALBUM':
    return {
      ...state,
      album: action.payload,
    };
  case 'SET_SETTINGS':
    localStorage.setItem('settings', JSON.stringify(action.payload));
    return {
      ...state,
      settings: action.payload,
    };
  default:
    return state;
  }
}

// const store = createStore(reducer, persistedState);
const store = createStore(reducer);

// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }, 1000));

export default store;
