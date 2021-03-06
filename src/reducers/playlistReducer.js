import {
  GET_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  GET_CURRENT_PLAYLIST
} from "../actions/actions";

const initialState = {
  allPlaylists: {},
  currPlaylist: {}
}

const playlistReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PLAYLISTS:
      const playlists = {};
      for (const item of action.payload) {
        const id = item._id;
        playlists[id] = item;
      }
      return Object.assign({}, state, { allPlaylists: playlists })
    case SET_CURRENT_PLAYLIST:
      // return state;
      return Object.assign({}, state, { currPlaylist: action.payload })
    case GET_CURRENT_PLAYLIST:
      return state.currPlaylist;
    default:
      return state;
  }
}

export default playlistReducer;