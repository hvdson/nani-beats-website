import songReducer from './currentSong';
import playReducer from './isPlaying';
import loadReducer from './isLoaded';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currSong: songReducer,
  isPlaying: playReducer,
  isLoaded: loadReducer,
  auth: authReducer,
  errors: errorReducer,
})

export default allReducers;