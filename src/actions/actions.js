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

export const getSong = content => ({
  type: 'GET_SONG',
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