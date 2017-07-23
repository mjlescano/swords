const { Room } = require('colyseus')
const {
  SET_PLAYER_NAME,
  SET_PLAYER_ANGLE,
  SET_PLAYER_MOVEMENT,
  PLAYER_SHOOT
} = require('../../common/action-types')
const State = require('./state')

const reducers = {
  [SET_PLAYER_NAME]: (state, { id }, [name]) => {
    const player = state.players.get(id)
    player.setName(name)
  },

  [SET_PLAYER_ANGLE]: (state, { id }, [angle]) => {
    const player = state.players.get(id)
    player.setAngle(angle)
  },

  [SET_PLAYER_MOVEMENT]: (state, { id }, [x, y]) => {
    const player = state.players.get(id)
    player.setMovement(x, y)
  },

  [PLAYER_SHOOT]: (state, { id }) => {
    state.playerShoot({ id })
  }
}

module.exports = class SwordsRoom extends Room {
  constructor (options) {
    super(options)

    this.setPatchRate(50)
    this.setState(new State())
    this.state.run()
  }

  onDispose () {
    this.state.stop()
  }

  onJoin ({ id }, { clientWidth, clientHeight }) {
    this.state.addPlayer({
      id,
      clientWidth,
      clientHeight
    })
  }

  onLeave (client) {
    this.state.removePlayer(client)
  }

  onMessage (client, [type, ...payload]) {
    if (reducers[type]) {
      reducers[type](this.state, client, payload)
    }
  }
}
