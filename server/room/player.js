const p2 = require('p2')
const pick = require('lodash.pick')
const shapes = require('../../common/shapes')

const PLAYER_SPEED = 4

module.exports = class Player {
  constructor ({ id, world, clientWidth, clientHeight }) {
    this.actions = new Map()
    this.world = world
    this.id = id
    this.name = ''
    this.position = [clientWidth / 2, clientHeight / 2]
    this.angle = 0

    this.body = new p2.Body({
      type: p2.Body.DYNAMIC,
      mass: 1,
      position: this.position,
      angle: 0
    })

    this.body.addShape(this.render())
    this.world.addBody(this.body)

    this.world.on('postStep', () => {
      this.update()
    })
  }

  render () {
    return new p2.Convex({
      vertices: shapes.player
    })
  }

  update () {
    this.actions.forEach((action, key) => {
      action()
      this.actions.delete(key)
    })

    this.position[0] = this.body.position[0]
    this.position[1] = this.body.position[1]
    this.angle = this.body.angle
  }

  remove () {
    this.world.removeBody(this.body)
  }

  toJSON () {
    return pick(this, [
      'id',
      'name',
      'position',
      'angle'
    ])
  }

  setName (name) {
    if (typeof name !== 'string') return
    if (name.length > 16) return
    this.name = name
  }

  setAngle (angle) {
    this.actions.set('angle', () => {
      this.body.angle = angle
    })
  }

  setMovement (x = 0, y = 0) {
    this.actions.set('move', () => {
      this.body.applyImpulse([PLAYER_SPEED * x, PLAYER_SPEED * y])
    })
  }
}
