import loop from 'frame-loop'
import p2 from 'p2'
import pick from 'lodash/fp/pick'
import createCollection from '../lib/collection'
import reducers from './reducers'
import Player from './entities/player'
import Bullet from './entities/bullet'

const toJSON = pick([
  'fps',
  'players',
  'bullets'
])

export default class Engine {
  constructor () {
    this.onTick = this.onTick.bind(this)

    this.world = new p2.World({
      gravity: [0, 0]
    })

    this.engine = loop(this.onTick)

    this.fps = 0
    this.players = createCollection(Player)
    this.bullets = createCollection(Bullet)

    this.engine.on('fps', (fps) => { this.fps = fps })
  }

  dispatch (attrs, [type, ...payload]) {
    if (reducers[type]) {
      console.log(` -> Dispatch ${type}`, payload)
      reducers[type](this, attrs, payload)
    }
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

  addPlayer ({ id, name }) {
    this.players.create(id, {
      world: this.world,
      name
    })
  }

  removePlayer ({ id }) {
    this.players.remove(id)
  }

  playerShoot ({ id }) {
    const player = this.players.get(id)
    const bullet = player.shoot()

    if (!bullet) return

    console.log(' -> shot', player.toJSON('name').name)

    bullet.onRemove(() => {
      this.bullets.remove(bullet.id, false)
    })

    this.bullets.set(bullet.id, bullet)
  }

  toJSON () {
    return toJSON(this)
  }
}
