import Colyseus from 'colyseus.js'
import { UPDATE_NAME } from '../../common/action-types'
import store from '../store'

const host = window.document.location.host.replace(/:.*/, '')
const client = new Colyseus.Client(`ws://${host}:8080`)
const room = client.join('default')

room.send([UPDATE_NAME, 'tout.'])

room.onUpdate.addOnce(() => {
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
