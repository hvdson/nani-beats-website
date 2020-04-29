let currSongId = 0
export const playSong = content => ({
  type: 'PLAY',
  payload: {
    id: ++currSongId,
    content
  }
})