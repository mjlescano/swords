import Matter from 'matter-js'
import { bindAll } from 'lodash'
// import throttle from '../../lib/throttle'
import createProps from '../../lib/create-props'
// import Bullet from './bullet'

export const MOVE_SPEED = 15
export const MOVE_FRICTION = 0.4
export const MOVE_INTERVAL = 40
export const ROTATE_INTERVAL = 40
export const SHOOT_INTERVAL = 100
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
      engine = null,
      name = 'Unknown',
      angle = Math.PI,
      position = [0, 0]
    } = options

    this.options = {
      angle,
      position
    }

    this.engine = engine
    this.props = createProps(this, props)
    this.toJSON = this.props.toJSON

    // this.shoot = throttle(function () {
    //   return new Bullet({ player: this })
    // }, SHOOT_INTERVAL)

    this.props.set({ name, focus: true })
    this.render()

    Matter.Events.on(engine, 'afterUpdate', () => {
      this.props.update()
    })

    bindAll(this, [
      'render',
      'remove'
    ])
  }

  render () {
    const [x, y] = this.options.position
    const { world } = this.engine

    const body = this.body = Matter.Bodies.fromVertices(x, y, shapeVector, {
      frictionAir: MOVE_FRICTION
    })

    Matter.World.add(world, body)

    return this
  }

  remove () {
    Matter.World.remove(this.engine.world, this.body)
  }
}
