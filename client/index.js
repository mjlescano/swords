import './room'
import './keymaps'
import './cursor'
import Fps from './entities/fps'
import Players from './containers/players'
import Bullets from './containers/bullets'

const entities = {
  fps: new Fps(),
  players: new Players(),
  bullets: new Bullets()
}

export default entities
