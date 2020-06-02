let playSongId = 0

export const playSong = content => ({
  type: 'PLAY',
  payload: {
    id: ++playSongId,
    content
  }
})

export const pauseSong = content => ({
  type: 'PAUSE',
  payload: {
    id: ++playSongId,
    content
  }
})


export const togglePlay = content => ({
  type: 'TOGGLE_PLAY',
  payload: {
    id: ++playSongId,
    content,
  }
})

export const loaded = content => ({
  type: 'LOADED',
  payload: {
    id: ++playSongId,
    content,
  }
})

export const notLoaded = content => ({
  type: 'NOT_LOADED',
  payload: {
    id: ++playSongId,
    content,
  }
})

export const LOAD_SONG = 'LOAD_SONG'

export const GET_SONG_URL_REQUEST = 'GET_SONG_URL_REQUEST';
export const GET_SONG_URL_SUCCESS = 'GET_SONG_URL_SUCCESS';
export const GET_SONG_URL_FAILURE = 'GET_SONG_URL_FAILURE';

export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const GET_PLAYLISTS = "GET_PLAYLISTS";
export const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST";
export const GET_CURRENT_PLAYLIST = "GET_CURRENT_PLAYLIST";

export const SET_CURR_SONG_POSITION = "SET_CURR_SONG_POSITION";
export const GET_CURR_SONG_POSITION = "GET_CURR_SONG_POSITION";