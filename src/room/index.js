import Colyseus from 'colyseus.js'
import { setName } from '../actions'
import store from '../store'

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client(`ws://${host}:8080`)
const room = client.join('default', {
  clientWidth: window.innerWidth,
  clientHeight: window.innerHeight
})

room.onJoin.addOnce(() => {
  setName('tout.')

  store.dispatch({
    type: 'SET_CURRENT_PLAYER',
    payload: { currentPlayer: client.id }
  })
})

room.onUpdate.add((state) => {
  store.dispatch({
    type: 'RECEIVE_ROOM',
    payload: state
  })
})

export default room
