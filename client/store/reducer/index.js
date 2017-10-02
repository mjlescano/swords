import { combineReducers } from 'redux'
import room from './room'
import currentPlayer from './current-player'

export default combineReducers({
  currentPlayer,
  room
})
