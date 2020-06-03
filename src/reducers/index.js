import songReducer from './currentSong';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import playlistReducer from './playlistReducer';
import trackControlReducers from './trackControlReducer';
import scrubBarReducer from './scrubBarReducer'
import { combineReducers } from 'redux';


const allReducers = combineReducers({
  currSong: songReducer,
  playlists: playlistReducer,
  trackControls: trackControlReducers,
  auth: authReducer,
  errors: errorReducer,
  position: scrubBarReducer,
})

export default allReducers;