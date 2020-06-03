
import {
  SET_CURR_SONG_POSITION
} from '../actions/actions'

const scrubBarReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_CURR_SONG_POSITION:
      return action.payload
    default:
      return state
  }
}

export default scrubBarReducer;
