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

export const loadSong = (content) => ({
  type: 'LOAD_SONG',
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