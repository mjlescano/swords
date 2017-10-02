import p2 from 'p2'
import shortid from 'shortid'
import mixin, { bindAll } from '../../lib/mixin'
import withProps from '../../lib/with-props'

export const BULLET_SPEED = 0.8
export const BULLET_LIFESPAN = 750
export const SHAPE = 2

const props = {
  position: {
    validate: () => false,

    toJSON () {
      const [x, y] = this.body.position
      return { position: [x, y] }
    }
  }
}

export default class Bullet extends mixin(bindAll, withProps(props)) {
  constructor ({ player }) {
    super()

    this.id = shortid.generate()
    this.world = player.world
    this.player = player
    this.onRemoveCallbacks = []

    this.render()

    this.world.on('postStep', () => {
      this.update()
    })

    setTimeout(() => {
      this.remove()
    }, BULLET_LIFESPAN)
  }

  render () {
    const { shape: { boundingRadius } } = this.player
    const { position } = this.player.toJSON('impulse')
    const { angle } = this.player.toJSON('angle')

    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    this.body = new p2.Body({
      mass: 0.05,
      position: [
        boundingRadius * cos + position[0],
        boundingRadius * sin + position[1]
      ],
      damping: 0,
      velocity: [
        BULLET_SPEED * cos,
        BULLET_SPEED * sin
      ]
    })

    this.shape = new p2.Circle({
      radius: SHAPE
    })

    this.body.addShape(this.shape)
    this.world.addBody(this.body)

    return this
  }

  remove () {
    this.world.removeBody(this.body)
    this.onRemoveCallbacks.forEach((cb) => cb())
    this.onRemoveCallbacks = []
  }

  onRemove (cb) {
    this.onRemoveCallbacks.push(cb)
  }
}
