import loop from 'frame-loop'
import pick from 'lodash/fp/pick'
import Matter from '../lib/matter-js'
import createCollection from '../lib/collection'
import generateIds from '../lib/generate-ids'
import generateColors from '../lib/generate-colors'
import { actionTypes } from '../action-types'
import reducers from './reducers'
import Player from './entities/player'
import Bullet from './entities/bullet'

const toJSON = pick([
  'fps',
  'players',
  'bullets'
])

export default class Game {
  constructor () {
    const world = Matter.World.create({
      label: 'World',
      gravity: {
        x: 0,
        y: 0,
        scale: 0.001
      },
      bounds: {
        min: { x: -1000, y: -1000 },
        max: { x: 1000, y: 1000 }
      }
    })

    const engine = Matter.Engine.create({ world })

    this.engine = engine
    this.world = world
    this.fps = 0
    this.generateId = generateIds()
    this.generateColor = generateColors()
    this.players = createCollection(Player)
    this.bullets = createCollection(Bullet)

    this.loop = loop((delta) => {
      Matter.Engine.update(engine, delta)
    })

    this.loop.on('fps', (fps) => { this.fps = fps })

    Matter.Events.on(engine, 'collisionEnd', function (evt) {
      evt.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair.collision

        const victim = Player.is(bodyA)
          ? bodyA.entity : Player.is(bodyB)
          ? bodyB.entity : null

        if (!victim) return

        const bullet = Bullet.is(bodyA)
          ? bodyA.entity : Bullet.is(bodyB)
          ? bodyB.entity : null

        if (!bullet) return

        const shooter = bullet.player

        bullet.remove()
        shooter.props.set('kills', 1)
        victim.props.set('deads', 1)
      })
    })
  }

  run () {
    this.loop.run()
  }

  pause () {
    this.loop.pause()
  }

  dispatch (id, [type, ...payload]) {
    if (!reducers.hasOwnProperty(type)) return
    if (!Array.isArray(payload)) return

    console.log(` -> Dispatch ${id} ${actionTypes[type]}`, payload)

    reducers[type](this, id, ...payload)
  }

  addPlayer (id) {
    const [name, color] = this.generateColor()

    this.players.create(id, {
      game: this,
      name,
      color
    })
  }

  removePlayer (id) {
    this.players.remove(id)
  }

  playerShoot (id) {
    const player = this.players.get(id)
    const bullet = player.shoot()

    if (!bullet) return

    bullet.onRemove(() => {
      this.bullets.remove(bullet.id, false)
    })

    this.bullets.set(bullet.id, bullet)
  }

  toJSON () {
    return toJSON(this)
  }
}
