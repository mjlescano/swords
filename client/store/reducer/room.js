import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SHOOT
} from '../../../common/action-types'
import room from '../../room'

const initialState = {
  players: {},
  bullets: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_ROOM': return payload
    case SET_NAME:
    case SET_ANGLE:
    case SET_IMPULSE:
    case SHOOT:
      const data = payload || []
      room.send([type, ...data])
      return state
    default:
      return state
  }
}
