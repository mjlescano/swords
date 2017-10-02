import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SHOOT
} from '../../../common/action-types'

export const setName = (name = 'Unknown') => ({
  type: SET_NAME,
  payload: [name]
})

export const setAngle = (angle) => ({
  type: SET_ANGLE,
  payload: [angle]
})

export const setImpulse = (x, y) => ({
  type: SET_IMPULSE,
  payload: [x, y]
})

export const shoot = () => ({
  type: SHOOT
})

export const setCurrentPlayer = (currentPlayer) => ({
  type: 'SET_CURRENT_PLAYER',
  payload: { currentPlayer }
})

export const updateRoom = (room) => ({
  type: 'UPDATE_ROOM',
  payload: room
})
