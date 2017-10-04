import { bindAll } from 'lodash'
import Matter from '../../lib/matter-js'
import createProps from '../../lib/create-props'

export const BULLET_SPEED = 25
export const MOVE_FRICTION = 0.05
export const SHAPE = 2

const props = {
  position: {
    validate: () => false,

    toJSON ({ body }) {
      const { x, y } = body.position
      return { position: [x, y] }
    }
  }
}

export default class Bullet {
  constructor ({ game, player }) {
    this.id = game.generateId()
    this.game = game
    this.player = player
    this.onRemoveCallbacks = []

    this.props = createProps(this, props)
    this.toJSON = this.props.toJSON

    this.render()

    bindAll(this, [
      'render',
      'remove',
      'onRemove'
    ])
  }

  render () {
    const { player } = this
    const { world } = this.game
    const { position } = player.toJSON('impulse')
    const { angle } = player.toJSON('angle')
    const playerRadius = 13

    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    const x = playerRadius * cos + position[0]
    const y = playerRadius * sin + position[1]

    const body = this.body = Matter.Bodies.circle(x, y, SHAPE, {
      frictionAir: MOVE_FRICTION
    })

    Matter.Body.setVelocity(body, {
      x: BULLET_SPEED * cos + player.body.velocity.x * Math.abs(cos) / 2,
      y: BULLET_SPEED * sin + player.body.velocity.y * Math.abs(sin) / 2
    })

    Matter.World.add(world, body)

    Matter.Events.on(this.game.engine, 'afterUpdate', () => {
      this.props.update()
      if (body.speed < 0.8) this.remove()
    })

    this.props.update()

    return this
  }

  remove () {
    Matter.World.remove(this.game.world, this.body)
    this.onRemoveCallbacks.forEach((cb) => cb())
    this.onRemoveCallbacks = []
  }

  onRemove (cb) {
    this.onRemoveCallbacks.push(cb)
  }
}
