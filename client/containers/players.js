import { EntityGroup } from '../lib/entity'
import withStore from '../store/with-store'
import Player from '../entities/player'

class Players extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = Player
  }
}

export default withStore(Players, (state) => state.room.players)
