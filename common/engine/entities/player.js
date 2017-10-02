import p2 from 'p2'
import throttle from '../../lib/throttle'
import mixin, { bindAll } from '../../lib/mixin'
import withProps from '../../lib/with-props'
import Bullet from './bullet'

export const MOVE_SPEED = 10
export const MOVE_INTERVAL = 40
export const ROTATE_INTERVAL = 40
export const SHOOT_INTERVAL = 100
export const SHAPE = [
  [22, 10],
  [0, 22],
  [0, 0]
]

const props = {
  name: {
    validate (val) {
      if (typeof val !== 'string') return false
      if (val.length > 16) return false
      return true
    }
  },

  angle: {
    interval: ROTATE_INTERVAL,

    validate (val) {
      if (typeof val !== 'number') return false
      if (val < -Math.PI || val > Math.PI) return false
      return true
    },

    update (angle) {
      this.body.angle = angle
    },

    toJSON () {
      return { angle: this.body.angle }
    }
  },

  impulse: {
    interval: MOVE_INTERVAL,

    validate (val) {
      if (!Array.isArray(val)) return false
      return val.every((v) => v === -1 || v === 0 || v === 1)
    },

    update ([x, y]) {
      this.body.applyImpulse([
        MOVE_SPEED * x,
        MOVE_SPEED * y
      ])
    },

    toJSON () {
      const [x, y] = this.body.position
      return { position: [x, y] }
    }
  }
}

export default class Player extends mixin(bindAll, withProps(props)) {
  constructor (options = {}) {
    super()

    const {
      world = new p2.World(),
      name = 'Unknown',
      angle = Math.PI,
      position = [0, 0]
    } = options

    this.options = {
      angle,
      position
    }

    this.world = world

    this.shoot = throttle(function () {
      return new Bullet({ player: this })
    }, SHOOT_INTERVAL)

    this
      .setProp({ name })
      .render()

    this.world.on('postStep', () => {
      this.update()
    })

    return this
  }

  render () {
    this.body = new p2.Body({
      type: p2.Body.DYNAMIC,
      mass: 2,
      position: this.options.position,
      angle: this.options.angle
    })

    this.shape = new p2.Convex({
      vertices: SHAPE
    })

    this.body.addShape(this.shape)
    this.world.addBody(this.body)

    return this
  }

  remove () {
    this.world.removeBody(this.body)
  }
}
