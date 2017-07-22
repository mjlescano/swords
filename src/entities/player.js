import { shapeToAnchor } from '../lib/two'
import { Entity, withWorld } from '../lib/entity'
import shapes from '../../common/shapes'

const shape = shapeToAnchor(shapes.player)

class Player extends Entity {
  render () {
    const el = this.el = this.world.makePath(shape)

    el.fill = '#333'
    el.noStroke()
  }

  update () {
    const [x, y] = this.state.position
    this.el.translation.set(x, y)
  }

  remove () {
    this.el.remove()
  }
}

export default withWorld(Player)
