import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SET_FOCUS,
  SHOOT
} from '../../common/action-types'

export default {
  [SET_NAME]: (engine, id, [name]) => {
    const player = engine.players.get(id)
    player.props.set('name', name)
  },

  [SET_ANGLE]: (engine, id, [angle]) => {
    const player = engine.players.get(id)
    player.props.set('angle', angle)
  },

  [SET_IMPULSE]: (engine, id, [x, y]) => {
    const player = engine.players.get(id)
    player.props.set('impulse', [x, y])
  },

  [SET_FOCUS]: (engine, id, [onFocus]) => {
    const player = engine.players.get(id)
    player.props.set('focus', onFocus)
  },

  [SHOOT]: (engine, id) => {
    engine.playerShoot(id)
  }
}
