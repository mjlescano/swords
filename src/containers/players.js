import { EntityGroup, withStore } from '../lib/entity'
import Player from '../entities/player'

class Players extends EntityGroup {
  init (...args) {
    super.init(...args)
    this.Child = Player
  }
}

export default withStore(Players, (state) => state.room.players)
