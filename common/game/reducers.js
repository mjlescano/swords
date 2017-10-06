import {
  SET_NAME,
  SET_ANGLE,
  SET_IMPULSE,
  SET_FOCUS,
  SHOOT
} from '../../common/action-types'

export default {
  [SET_NAME]: (game, id, name) => {
    const player = game.players.get(id)
    player.props.set('name', name)
  },

  [SET_ANGLE]: (game, id, angle) => {
    const player = game.players.get(id)
    player.props.set('angle', angle)
  },

  [SET_IMPULSE]: (game, id, x, y) => {
    const player = game.players.get(id)
    player.props.set('impulse', [x, y])
  },

  [SET_FOCUS]: (game, id, onFocus) => {
    const player = game.players.get(id)
    player.props.set('focus', onFocus)
  },

  [SHOOT]: (game, id) => {
    game.playerShoot(id)
  }
}
