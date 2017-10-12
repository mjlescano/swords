import { WIDTH, HEIGHT } from '../../common/game/world'
import Two from '../lib/two'

const game = document.getElementById('game')

const world = new Two({
  type: Two.Types.svg,
  autostart: true,
  width: WIDTH,
  height: HEIGHT
}).appendTo(game)

// [0, 0] should be at the center
world.scene.translation.set(WIDTH / 2, HEIGHT / 2)

export default world
