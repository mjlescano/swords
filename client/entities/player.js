import { SHAPE } from '../../common/game/entities/player'
import { shapeToAnchor } from '../lib/two'
import { Entity, EntityGroup } from '../lib/entity'
import withStore from '../store/with-store'
import withWorld from '../world/with-world'

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

class Players extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = withWorld(Player)
  }
}

export default withStore(Players, (state) => state.room.players)
