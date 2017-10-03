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
    const { color } = this.state
    const el = this.el = this.world.makePath(shape)

    el.fill = color
    el.noStroke()

    this.update()
  }

  update () {
    const {
      position: [x, y],
      angle,
      focus
    } = this.state

    this.el.translation.set(x, y)
    this.el.rotation = angle
    this.el.opacity = focus ? 1 : 0.5
  }

  remove () {
    this.el.remove()
  }
}

export default withWorld(Player)
