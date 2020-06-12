import * as constants from '../actions/actions'
import * as actions from '../actions/trackControlsActions';

describe('actions', () => {
  it('should create playSong action', () => {
    const expectedAction = {
      type: constants.PLAY,
    }
    expect(actions.playSong()).toEqual(expectedAction)
  })

  it('should create pauseSong action', () => {
    const expectedAction = {
      type: constants.PAUSE,
    }
    expect(actions.pauseSong()).toEqual(expectedAction)
  })

  it('should create a playFromPosition action', () => {
    const newPosition = 333331;
    const expectedAction = {
      type: constants.PLAY_FROM_POSITION,
      payload: newPosition
    }
    expect(actions.playFromPosition(newPosition)).toEqual(expectedAction)
  })

})