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

store.subscribe(() => {
  world.render()
})

export default world
