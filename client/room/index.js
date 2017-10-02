import Colyseus from 'colyseus.js'
import focus from 'observ-focus'
import {
  setName,
  setCurrentPlayer,
  updateRoom,
  setFocus,
  setMe
} from '../store/actions'
import store from '../store'

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client(`ws://${host}:8080`)
const room = client.join('default')

room.onJoin.addOnce(() => {
  store.dispatch(setName('tout.'))
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
