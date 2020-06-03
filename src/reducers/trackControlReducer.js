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

const trackControlReducers = combineReducers({
  isPlaying: playReducer,
  isLoaded: loadReducer,
})

export default trackControlReducers;

