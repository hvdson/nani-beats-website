import {
  PLAY,
  PAUSE,
  TOGGLE_PLAY,
  LOADED,
  NOT_LOADED,
  PLAY_FROM_POSITION
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

// TODO: move this to own module
export const playFromPosition = newPosition => {
  return ({
    type: PLAY_FROM_POSITION,
    payload: newPosition
  })
}