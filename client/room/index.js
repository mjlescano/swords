import Colyseus from 'colyseus.js'
import focus from 'observ-focus'
import {
  setName,
  setCurrentPlayer,
  updateRoom,
  setFocus,
  setMe
} from '../store/actions'
import store, { getCurrentPlayer } from '../store'

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

let lastMe
store.subscribe(() => {
  const me = getCurrentPlayer(store.getState()) || null
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
