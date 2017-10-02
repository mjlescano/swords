import Colyseus from 'colyseus.js'
import { setName, setCurrentPlayer, updateRoom } from '../store/actions'
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

export default room
export { client }
