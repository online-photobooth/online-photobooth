import { createStore } from 'redux'

const initialState = {
  accessToken: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        accessToken: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store