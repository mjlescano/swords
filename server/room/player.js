const p2 = require('p2')
const pick = require('lodash.pick')
const shapes = require('../../common/shapes')

module.exports = class Player {
  constructor ({ id, world }) {
    this.world = world
    this.id = id
    this.name = ''
    this.position = [100, 100]
    this.rotation = 0

    this.body = new p2.Body({
      mass: 5,
      position: this.position
    })

    this.body.addShape(this.render())
    this.world.addBody(this.body)

    this.world.on('postStep', () => { this.update() })
  }

  render () {
    return new p2.Convex({
      vertices: shapes.player
    })
  }

  update () {
    this.position[0] = this.body.position[0]
    this.position[1] = this.body.position[1]
  }

  setName (name) {
    if (typeof name !== 'string') return
    if (name.length > 16) return
    this.name = name
  }

  toJSON () {
    return pick(this, [
      'id',
      'name',
      'position',
      'rotation'
    ])
  }
}
