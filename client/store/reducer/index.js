import { combineReducers } from 'redux'
import currentPlayer from './current-player'
import me from './me'
import room from './room'

export default combineReducers({
  currentPlayer,
  me,
  room
})
