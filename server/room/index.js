const { Room } = require('colyseus')
const { UPDATE_NAME } = require('../../common/action-types')
const State = require('./state')

const reducers = {
  [UPDATE_NAME]: (state, { id }, [name]) => {
    state.players[id].setName(name)
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

  onJoin (client) {
    this.state.addPlayer(client)
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
