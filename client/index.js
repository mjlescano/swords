import './room'
import './keymaps'
import './cursor'
import Debug from './entities/debug'
import Score from './entities/score'
import Players from './containers/players'
import Bullets from './containers/bullets'

const entities = {
  debug: new Debug(),
  score: new Score(),
  players: new Players(),
  bullets: new Bullets()
}

export default entities
