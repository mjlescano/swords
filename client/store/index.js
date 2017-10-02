import { createStore } from 'redux'
import reducer from './reducer'

const devTools = (typeof window !== 'undefined' || undefined) &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducer, undefined, devTools)

export default store

export const getCurrentPlayer = (state) => {
  if (!state.currentPlayer) return null
  if (!state.room) return null
  return state.room.players[state.currentPlayer]
}
