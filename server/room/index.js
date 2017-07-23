const { Room } = require('colyseus')
const {
  SET_PLAYER_NAME,
  SET_PLAYER_ANGLE,
  SET_PLAYER_MOVEMENT
} = require('../../common/action-types')
const State = require('./state')

const reducers = {
  [SET_PLAYER_NAME]: (state, { id }, [name]) => {
    state.players[id].setName(name)
  },

  [SET_PLAYER_ANGLE]: (state, { id }, [angle]) => {
    state.players[id].setAngle(angle)
  },

  [SET_PLAYER_MOVEMENT]: (state, { id }, [x, y]) => {
    state.players[id].setMovement(x, y)
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
