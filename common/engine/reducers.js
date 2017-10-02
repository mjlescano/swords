import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SHOOT
} from '../../common/action-types'

export default {
  [SET_NAME]: (state, { id }, [name]) => {
    const player = state.players.get(id)
    player.setProp('name', name)
  },

  [SET_ANGLE]: (state, { id }, [angle]) => {
    const player = state.players.get(id)
    player.setProp('angle', angle)
  },

  [SET_IMPULSE]: (state, { id }, [x, y]) => {
    const player = state.players.get(id)
    player.setProp('impulse', [x, y])
  },

  [SHOOT]: (state, { id }) => {
    state.playerShoot({ id })
  }
}
