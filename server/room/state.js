const loop = require('frame-loop')
const p2 = require('p2')
const pick = require('lodash.pick')
const DumpableMap = require('../lib/dumpable-map')
const Player = require('./player')

module.exports = class State {
  constructor () {
    this.onTick = this.onTick.bind(this)

    this.world = new p2.World({
      gravity: [0, 0]
    })

    this.engine = loop(this.onTick)

    this.fps = 0
    this.players = new DumpableMap()
    this.bullets = new DumpableMap()

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

    this.players.set(attrs.id, player)
  }

  removePlayer ({ id }) {
    const player = this.players.get(id)
    player.remove()
    this.players.delete(id)
  }

  playerShoot ({ id }) {
    const player = this.players.get(id)
    const bullet = player.shoot()
    if (!bullet) return

    bullet.onRemove(() => {
      this.bullets.delete(bullet.id)
    })

    this.bullets.set(bullet.id, bullet)
  }

  toJSON () {
    return pick(this, [
      'fps',
      'players',
      'bullets'
    ])
  }
}
