import { EntityGroup } from '../lib/entity'
import withStore from '../store/with-store'
import Bullet from '../entities/bullet'

class Bullets extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = Bullet
  }
}

export default withStore(Bullets, (state) => state.room.bullets)
