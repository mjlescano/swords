import { throttle } from 'lodash'
import Two from '../lib/two'
import store from '../store'

const width = window.innerWidth
const height = window.innerHeight

const world = new Two({
  type: Two.Types.webgl,
  autostart: false,
  width,
  height
}).appendTo(document.body)

const render = throttle(() => world.render(), 25)

store.subscribe(() => render.flush())
setInterval(render, 25)

export default world
