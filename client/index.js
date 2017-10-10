import './room'
import './keymaps'
import './cursor'
import Debug from './entities/debug'
import Score from './entities/score'
import Players from './entities/player'
import Bullets from './entities/bullet'

const entities = {
  debug: new Debug(),
  score: new Score(),
  players: new Players(),
  bullets: new Bullets()
}

export default entities
