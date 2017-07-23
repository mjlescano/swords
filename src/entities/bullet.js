import { Entity, withWorld } from '../lib/entity'
import shapes from '../../common/shapes'

class Bullet extends Entity {
  render () {
    const { position: [x, y] } = this.state
    const el = this.el = this.world.makeEllipse(x, y, shapes.bullet)

    el.fill = '#333'
    el.noStroke()

    this.update()
  }

  update () {
    const { position: [x, y] } = this.state
    this.el.translation.set(x, y)
  }

  remove () {
    this.el.remove()
  }
}

export default withWorld(Bullet)
