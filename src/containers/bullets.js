import { EntityGroup, withStore } from '../lib/entity'
import Bullet from '../entities/bullet'

class Bullets extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = Bullet
  }
}

export default withStore(Bullets, (state) => state.room.bullets)
