import { shapeToAnchor } from '../lib/two'
import { Entity } from '../lib/entity'
import withWorld from '../world/with-world'

const SHAPE = [
  [22, 10],
  [0, 22],
  [0, 0]
]

const shape = shapeToAnchor(SHAPE)

class Player extends Entity {
  render () {
    const el = this.el = this.world.makePath(shape)

    el.fill = '#333'
    el.noStroke()

    this.update()
  }

  update () {
    const {
      position: [x, y],
      angle
    } = this.state

    this.el.translation.set(x, y)
    this.el.rotation = angle
  }

  remove () {
    this.el.remove()
  }
}

export default withWorld(Player)
