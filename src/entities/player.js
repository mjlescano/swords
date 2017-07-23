import { shapeToAnchor } from '../lib/two'
import { Entity, withWorld } from '../lib/entity'
import shapes from '../../common/shapes'

const shape = shapeToAnchor(shapes.player)

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
