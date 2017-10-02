import { Entity } from '../lib/entity'
import withWorld from '../world/with-world'

const SHAPE = 2

class Bullet extends Entity {
  render () {
    const { position: [x, y] } = this.state
    const el = this.el = this.world.makeEllipse(x, y, SHAPE)

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
