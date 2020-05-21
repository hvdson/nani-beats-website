import songReducer from './currentSong';
import playReducer from './isPlaying';
import loadReducer from './isLoaded';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import playlistReducer from './playlistReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  currSong: songReducer,
  playlists: playlistReducer,
  isPlaying: playReducer,
  isLoaded: loadReducer,
  auth: authReducer,
  errors: errorReducer,
})

export default allReducers;