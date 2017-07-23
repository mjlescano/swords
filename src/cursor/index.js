import throttle from 'lodash.throttle'
import mousePosition from 'mouse-position'
import store, { getCurrentPlayer } from '../store'
import { setAngle } from '../actions'
import world from '../world'

const mouse = mousePosition(world.canvas)

const updateAngle = throttle(() => {
  const currentPlayer = getCurrentPlayer(store.getState())

  if (!currentPlayer) return

  const player = currentPlayer.position
  const cursor = [mouse[0], mouse[1]]

  const angle = Math.atan2(cursor[1] - player[1], cursor[0] - player[0]) + Math.PI / 2

  console.log(angle)
  setAngle(angle)
}, 25)

mouse.on('move', updateAngle)
store.subscribe(updateAngle)
