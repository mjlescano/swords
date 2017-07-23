const p2 = require('p2')
const pick = require('lodash.pick')
const shapes = require('../../common/shapes')
const Bullet = require('./bullet')

class Player {
  constructor ({ id, world, clientWidth, clientHeight }) {
    this.actions = new Map()
    this.world = world
    this.id = id
    this.name = ''
    this.position = [clientWidth / 2, clientHeight / 2]
    this.angle = -(Math.PI / 2)
    this.lastShot = +new Date()

    this.render()

    this.world.on('postStep', () => {
      this.update()
    })
  }

  render () {
    this.body = new p2.Body({
      type: p2.Body.DYNAMIC,
      mass: 1,
      position: this.position,
      angle: this.angle
    })

    this.shape = new p2.Convex({
      vertices: shapes.player
    })

    this.body.addShape(this.shape)
    this.world.addBody(this.body)

    this.update()
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

  shoot () {
    const now = +new Date()
    if (now - this.lastShot < Player.PLAYER_SHOOT_INTERVAL) return null
    this.lastShot = now

    return new Bullet({ player: this })
  }

  setMovement (x = 0, y = 0) {
    this.actions.set('move', () => {
      this.body.applyImpulse([Player.PLAYER_SPEED * x, Player.PLAYER_SPEED * y])
    })
  }
}

Player.PLAYER_SPEED = 4
Player.PLAYER_SHOOT_INTERVAL = 100

module.exports = Player
