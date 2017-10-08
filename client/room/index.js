import Colyseus from 'colyseus.js'
import focus from 'observ-focus'
import {
  setCurrentPlayer,
  updateRoom,
  setFocus,
  setMe
} from '../store/actions'
import store from '../store'

const host = window.location.host
const protocol = window.document.location.protocol === 'https:' ? 'wss' : 'ws'

const client = new Colyseus.Client(`${protocol}://${host}`)
const room = client.join('default')

room.onJoin.addOnce(() => {
  store.dispatch(setCurrentPlayer(client.id))
})

room.onUpdate.add((state) => {
  store.dispatch(updateRoom(state))
})

function getMe (state) {
  if (!state.currentPlayer) return null
  if (!state.room) return null
  return state.room.players[state.currentPlayer] || null
}

let lastMe
store.subscribe(() => {
  const me = getMe(store.getState())

  const json = JSON.stringify(me)
  if (lastMe === json) return
  lastMe = json

  store.dispatch(setMe(me))
})

focus((onFocus) => {
  store.dispatch(setFocus(onFocus))
})

export default room
export { client }
