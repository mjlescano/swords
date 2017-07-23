const loop = require('frame-loop')
const p2 = require('p2')
const pick = require('lodash.pick')
const Player = require('./player')

module.exports = class State {
  constructor () {
    this.onTick = this.onTick.bind(this)

    this.world = new p2.World({
      gravity: [0, 0]
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

  addPlayer (attrs) {
    const player = new Player(Object.assign({
      world: this.world
    }, attrs))

    this.players[attrs.id] = player
  }

  removePlayer ({ id }) {
    this.players[id].remove()
    delete this.players[id]
  }

  toJSON () {
    return pick(this, [
      'fps',
      'players'
    ])
  }
}
