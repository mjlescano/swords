import './room'
import './keymaps'
import './cursor'
import Debug from './entities/debug'
import Players from './containers/players'
import Bullets from './containers/bullets'

const entities = {
  debug: new Debug(),
  players: new Players(),
  bullets: new Bullets()
}

export default entities
