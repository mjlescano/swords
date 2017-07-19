const loop = require('frame-loop')
const p2 = require('p2')
const pick = require('lodash.pick')
const Player = require('./player')

module.exports = class State {
  constructor () {
    this.onTick = this.onTick.bind(this)

    this.world = new p2.World({
      gravity: [0, 0.001]
    })

    this.engine = loop(this.onTick)

    this.fps = 0
    this.players = {}

    this.engine.on('fps', (fps) => { this.fps = fps })
  }

  run () {
    this.engine.run()
  }

  stop () {
    this.engine.pause()
  }

  onTick (delta) {
    this.world.step(delta)
  }

  addPlayer ({ id }) {
    const player = new Player({
      id,
      world: this.world
    })

    this.players[id] = player
  }

  removePlayer ({ id }) {
    delete this.players[id]
  }

  toJSON () {
    return pick(this, [
      'fps',
      'players'
    ])
  }
}
