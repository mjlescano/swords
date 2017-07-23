const p2 = require('p2')
const pick = require('lodash.pick')
const shortid = require('shortid')
const shapes = require('../../common/shapes')

class Bullet {
  constructor ({ player }) {
    this.id = shortid.generate()
    this.world = player.world
    this.player = player
    this.position = [0, 0]
    this.onRemoveCallbacks = []

    this.render()

    setTimeout(() => {
      this.remove()
      this.onRemoveCallbacks.forEach((cb) => cb())
      this.onRemoveCallbacks = []
    }, Bullet.BULLET_LIFESPAN)

    this.world.on('postStep', () => {
      this.update()
    })
  }

  onRemove (cb) {
    this.onRemoveCallbacks.push(cb)
  }

  render () {
    const {
      position,
      angle,
      shape: { boundingRadius }
    } = this.player

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
        Bullet.BULLET_SPEED * cos,
        Bullet.BULLET_SPEED * sin
      ]
    })

    this.shape = new p2.Circle({
      radius: shapes.bullet
    })

    this.body.addShape(this.shape)
    this.world.addBody(this.body)

    this.update()
  }

  update () {
    this.position[0] = this.body.position[0]
    this.position[1] = this.body.position[1]
  }

  remove () {
    this.world.removeBody(this.body)
  }

  toJSON () {
    return pick(this, [
      'position'
    ])
  }
}

Bullet.BULLET_SPEED = 0.8
Bullet.BULLET_LIFESPAN = 750

module.exports = Bullet
