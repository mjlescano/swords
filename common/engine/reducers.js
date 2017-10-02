import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SET_FOCUS,
  SHOOT
} from '../../common/action-types'

export default {
  [SET_NAME]: (engine, { id }, [name]) => {
    const player = engine.players.get(id)
    player.setProp('name', name)
  },

  [SET_ANGLE]: (engine, { id }, [angle]) => {
    const player = engine.players.get(id)
    player.setProp('angle', angle)
  },

  [SET_IMPULSE]: (engine, { id }, [x, y]) => {
    const player = engine.players.get(id)
    player.setProp('impulse', [x, y])
  },

  [SET_FOCUS]: (engine, { id }, [onFocus]) => {
    const player = engine.players.get(id)
    player.setProp('focus', onFocus)
  },

  [SHOOT]: (engine, { id }) => {
    engine.playerShoot({ id })
  }
}
