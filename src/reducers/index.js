import songReducer from './currentSong';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import playlistReducer from './playlistReducer';
import trackControlReducers from './trackControlReducer';
import scrubBarReducer from './scrubBarReducer';
import queueReducer from './queueReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
  currSong: songReducer,
  playlists: playlistReducer,
  trackControls: trackControlReducers,
  auth: authReducer,
  errors: errorReducer,
  scrubBar: scrubBarReducer,
  queue: queueReducer,
})

export default allReducers;