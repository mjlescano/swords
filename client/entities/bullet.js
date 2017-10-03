import { SHAPE, BULLET_LIFESPAN } from '../../common/game/entities/bullet'
import { Entity } from '../lib/entity'
import withWorld from '../world/with-world'

class Bullet extends Entity {
  render () {
    const { position: [x, y] } = this.state
    const el = this.el = this.world.makeEllipse(x, y, SHAPE)

    el.fill = '#333'
    el.noStroke()

    this.update()

    setTimeout(() => {
      el.opacity = 0
    }, BULLET_LIFESPAN)
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
