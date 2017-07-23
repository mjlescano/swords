import {
  SET_PLAYER_NAME,
  SET_PLAYER_ANGLE,
  SET_PLAYER_MOVEMENT
} from '../../common/action-types'
import room from '../room'

export const setName = (angle) => {
  room.send([SET_PLAYER_NAME, 'tout.'])
}

export const setAngle = (angle) => {
  room.send([SET_PLAYER_ANGLE, angle])
}

export const setMovement = (x, y) => {
  room.send([SET_PLAYER_MOVEMENT, x, y])
}
