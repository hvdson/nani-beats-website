import {
  PLAY,
  PAUSE,
  TOGGLE_PLAY,
  LOADED,
  NOT_LOADED,
  PLAY_FROM_POSITION,
  NEXT_SONG,
  PREV_SONG
} from "./actions";

export const playSong = () => ({
  type: PLAY,
})

export const pauseSong = () => ({
  type: PAUSE,
})

export const togglePlay = () => ({
  type: TOGGLE_PLAY,
})

export const loaded = () => ({
  type: LOADED,
})

export const notLoaded = () => ({
  type: NOT_LOADED,
})

export const nextSong = () => ({
  type: NEXT_SONG,
})

export const prevSong = () => ({
  type: PREV_SONG,
})

// TODO: move this to own module
export const playFromPosition = newPosition => {
  return ({
    type: PLAY_FROM_POSITION,
    payload: newPosition
  })
}