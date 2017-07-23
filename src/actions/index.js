import {
  SET_PLAYER_NAME,
  SET_PLAYER_ANGLE,
  SET_PLAYER_MOVEMENT,
  PLAYER_SHOOT
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

export const shoot = () => {
  room.send([PLAYER_SHOOT])
}
