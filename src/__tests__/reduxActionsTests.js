import * as constants from '../actions/actions'
import * as trackControlActions from '../actions/trackControlsActions';
import * as queueActions from '../actions/queueActions';
import * as songActions from '../actions/songActions';


describe('actions', () => {
  it('should create playSong action', () => {
    const expectedAction = {
      type: constants.PLAY,
    }
    expect(trackControlActions.playSong()).toEqual(expectedAction)
  })

  it('should create pauseSong action', () => {
    const expectedAction = {
      type: constants.PAUSE,
    }
    expect(trackControlActions.pauseSong()).toEqual(expectedAction)
  })

  it('should create a playFromPosition action', () => {
    const newPosition = 333331;
    const expectedAction = {
      type: constants.PLAY_FROM_POSITION,
      payload: newPosition
    }
    expect(trackControlActions.playFromPosition(newPosition)).toEqual(expectedAction)
  })

  it('should load new songs into queue', () => {
    const newQueue = [{
      "_id": "5ec2f4b828ceb93e61b2ff39",
      "songId": "hashnum69",
      "s3Key": "NANI BEATS VOL. 4/ Charleston.mp3",
      "imgThumbUrl": "https://i.redd.it/fx8fagknp1k21.jpg",
      "artistsType": ["Lance The Wrapper", "Drake", "Post Malone"],
      "title": "Charleston",
      "bpm": {
        "$numberInt": "69"
      },
      "key": "A#",
      "length": "3:18",
      "dateAdded": "1589828091349",
      "tags": ["dank beat", "neat", "heat", "🔥"]
    }]
    const expectedAction = {
      type: constants.LOAD_SONGS_INTO_QUEUE,
      payload: newQueue
    }
    expect(queueActions.loadSongsIntoQueue(newQueue)).toEqual(expectedAction);
  })

  it('should load new songs into queue', () => {
    const newPlaylist = "5ec2f4b828ceb93e61b2ff39";
    const expectedAction = {
      type: constants.LOAD_PLAYLIST_INTO_QUEUE,
      payload: newPlaylist
    }
    expect(queueActions.loadPlaylistIntoQueue(newPlaylist)).toEqual(expectedAction);
  })

  it('should load new songs into currSong', () => {
    const newSong = {
      "_id": "5ec2f4b828ceb93e61b2ff39",
      "songId": "hashnum69",
      "s3Key": "NANI BEATS VOL. 4/ Charleston.mp3",
      "imgThumbUrl": "https://i.redd.it/fx8fagknp1k21.jpg",
      "artistsType": ["Lance The Wrapper", "Drake", "Post Malone"],
      "title": "Charleston",
      "bpm": {
        "$numberInt": "69"
      },
      "key": "A#",
      "length": "3:18",
      "dateAdded": "1589828091349",
      "tags": ["dank beat", "neat", "heat", "🔥"]
    };
    const expectedAction = {
      type: constants.LOAD_SONG,
      payload: newSong
    };
    expect(songActions.loadSong(newSong)).toEqual(expectedAction);
  })
})