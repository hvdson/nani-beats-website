import songReducer from './currentSong';
import playReducer from './isPlaying';
import loadReducer from './isLoaded';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currSong: songReducer,
  isPlaying: playReducer,
  isLoaded: loadReducer,
})

export default allReducers;