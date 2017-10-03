import Matter from 'matter-js'
import { bindAll } from 'lodash'
import throttle from '../../lib/throttle'
import createProps from '../../lib/create-props'
import Bullet from './bullet'

export const MOVE_SPEED = 15
export const MOVE_FRICTION = 0.4
export const MOVE_INTERVAL = 40
export const ROTATE_INTERVAL = 40
export const SHOOT_INTERVAL = 50
export const MAX_BULLETS = 3
export const SHAPE = [
  [22, 10],
  [0, 22],
  [0, 0]
]

const shapeVector = SHAPE.map(([x, y]) => ({ x, y }))

const props = {
  name: {
    validate (entity, val) {
      if (typeof val !== 'string') return false
      if (val.length > 16) return false
      return true
    }
  },

  color: {
    validate: () => false
  },

  focus: {
    validate (entity, val) {
      return typeof val !== 'boolean'
    }
  },

  angle: {
    interval: ROTATE_INTERVAL,

    validate (entity, val) {
      if (typeof val !== 'number') return false
      if (val < -Math.PI || val > Math.PI) return false
      return true
    },

    update (entity, angle) {
      Matter.Body.setAngle(entity.body, angle)
    },

    toJSON (entity) {
      return { angle: entity.body.angle }
    }
  },

  impulse: {
    interval: MOVE_INTERVAL,

    validate (entity, val) {
      if (!Array.isArray(val)) return false
      return val.every((v) => v === -1 || v === 0 || v === 1)
    },

    update (entity, [x, y]) {
      Matter.Body.setVelocity(entity.body, {
        x: MOVE_SPEED * x,
        y: MOVE_SPEED * y
      })
    },

    toJSON (entity) {
      const { x, y } = entity.body.position
      return { position: [x, y] }
    }
  }
}

export default class Player {
  constructor (options = {}) {
    const {
      game = null,
      name = 'Unknown',
      color = '#333',
      angle = Math.PI,
      position = [0, 0]
    } = options

    this.options = {
      angle,
      position,
      color
    }

    this.game = game
    this.props = createProps(this, props)
    this.toJSON = this.props.toJSON

    let bulletCount = 0
    this.shoot = throttle(function () {
      if (bulletCount >= MAX_BULLETS) return
      bulletCount++
      const bullet = new Bullet({ game, player: this })
      bullet.onRemove(() => bulletCount--)
      return bullet
    }, SHOOT_INTERVAL)

    this.props.set({ name, color, focus: true })
    this.render()

    Matter.Events.on(game.engine, 'afterUpdate', () => {
      this.props.update()
    })

    bindAll(this, [
      'render',
      'remove'
    ])
  }

  render () {
    const [x, y] = this.options.position
    const { world } = this.game

    const body = this.body = Matter.Bodies.fromVertices(x, y, shapeVector, {
      frictionAir: MOVE_FRICTION
    })

    Matter.World.add(world, body)

    this.props.update()

    return this
  }

  remove () {
    Matter.World.remove(this.game.world, this.body)
  }
}
