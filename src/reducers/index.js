import songReducer from './currentSong';
import playReducer from './isPlaying';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currSong: songReducer,
  isPlaying: playReducer
})

export default allReducers;