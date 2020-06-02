import { SET_CURR_SONG_POSITION } from '../actions/actions'

import {
  combineReducers
} from 'redux';

const playReducer = (state = false, action) => {
  switch (action.type) {
    case 'PLAY':
      return true;
    case 'PAUSE':
      return false;
    case 'TOGGLE_PLAY':
      return !state;
    default:
      return state;
      // do nothing
  }
};

const loadReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOADED':
      return true;
    case 'NOT_LOADED':
      return false;
    default:
      return state;
  }
};

const scrubBarReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_CURR_SONG_POSITION:
      return action.payload
    default:
      return state
  }
}

const trackControlReducers = combineReducers({
  isPlaying: playReducer,
  isLoaded: loadReducer,
  position: scrubBarReducer,
})

export default trackControlReducers;

