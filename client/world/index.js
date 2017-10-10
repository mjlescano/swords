import { throttle } from 'lodash'
import { WIDTH, HEIGHT } from '../../common/game/world'
import Two from '../lib/two'
import store from '../store'

const world = new Two({
  type: Two.Types.webgl,
  autostart: false,
  width: window.innerWidth,
  height: window.innerHeight
}).appendTo(document.body)

const render = throttle(() => world.render(), 35)

store.subscribe(() => render.flush())
setInterval(render, 35)

export default world
