import loop from 'frame-loop'
import Matter from 'matter-js'
import pick from 'lodash/fp/pick'
import createCollection from '../lib/collection'
import { actionTypes } from '../action-types'
import reducers from './reducers'
import Player from './entities/player'
import Bullet from './entities/bullet'

Matter.Common.isElement = () => false

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
        min: { x: -Infinity, y: -Infinity },
        max: { x: Infinity, y: Infinity }
      }
    })

    const engine = Matter.Engine.create({ world })

    this._nextId = 0
    this.engine = engine
    this.world = world
    this.fps = 0
    this.players = createCollection(Player)
    this.bullets = createCollection(Bullet)

    this.loop = loop((delta) => {
      Matter.Engine.update(engine, delta)
    })

    this.loop.on('fps', (fps) => { this.fps = fps })
  }

  nextId () {
    this._nextId += 1
    if (this._nextId === 1000000) this._nextId = 1
    return this._nextId.toString(36)
  }

  run () {
    this.loop.run()
  }

  pause () {
    this.loop.pause()
  }

  dispatch (id, [type, ...payload]) {
    if (!reducers.hasOwnProperty(type)) return

    console.log(` -> Dispatch ${id} ${actionTypes[type]}`, payload)

    reducers[type](this, id, payload)
  }

  addPlayer (id) {
    this.players.create(id, {
      game: this
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