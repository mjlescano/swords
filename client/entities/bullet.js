import { SHAPE } from '../../common/game/entities/bullet'
import { Entity, EntityGroup } from '../lib/entity'
import withStore from '../store/with-store'
import withWorld from '../world/with-world'

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

class Bullets extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = withWorld(Bullet)
  }
}

export default withStore(Bullets, (state) => state.room.bullets)
