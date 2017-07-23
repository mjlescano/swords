import throttle from 'lodash.throttle'
import mousePosition from 'mouse-position'
import store, { getCurrentPlayer } from '../store'
import { setAngle, shoot } from '../actions'
import world from '../world'

const mouse = mousePosition(world.canvas)

const handleAngleChange = throttle(() => {
  const currentPlayer = getCurrentPlayer(store.getState())

  if (!currentPlayer) return

  const player = currentPlayer.position
  const cursor = [mouse[0], mouse[1]]

  const angle = Math.atan2(cursor[1] - player[1], cursor[0] - player[0])

  setAngle(angle)
}, 25)

mouse.once('move', () => {
  mouse.on('move', handleAngleChange)
  store.subscribe(handleAngleChange)
})

const handleShoot = throttle(shoot, 75)

window.addEventListener('click', handleShoot, false)
