import { bindAll } from 'lodash'
import Matter from '../../lib/matter-js'
import throttle from '../../lib/throttle'
import createProps from '../../lib/create-props'
import Bullet from './bullet'

export const MOVE_SPEED = 16
export const MOVE_FRICTION = 0.4
export const MOVE_INTERVAL = 50
export const SET_ANGLE_INTERVAL = 50
export const SHOOT_INTERVAL = 100
export const MAX_BULLETS = 4
export const SHAPE = [
  [30, 14],
  [0, 30],
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
    validate: (entity, val) => typeof val === 'boolean'
  },

  angle: {
    interval: SET_ANGLE_INTERVAL,

    validate (entity, val) {
      if (typeof val !== 'number') return false
      if (val < -Math.PI || val > Math.PI) return false
      return true
    },

    update ({ body }, angle) {
      Matter.Body.setAngle(body, angle)
    },

    toJSON ({ body }) {
      const { angle } = body
      return { angle }
    }
  },

  impulse: {
    interval: MOVE_INTERVAL,

    validate (entity, val) {
      if (!Array.isArray(val)) return false
      if (val.length !== 2) return false
      return val.every((v) => v === -1 || v === 0 || v === 1)
    },

    update ({ body }, [x, y]) {
      Matter.Body.setVelocity(body, {
        x: MOVE_SPEED * x,
        y: MOVE_SPEED * y
      })
    },

    toJSON ({ body }) {
      const { x, y } = body.position
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

    Matter.Events.on(this.game.engine, 'afterUpdate', () => {
      this.props.update()
    })

    this.props.update()

    return this
  }

  remove () {
    Matter.World.remove(this.game.world, this.body)
  }
}
