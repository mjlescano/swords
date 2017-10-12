import { throttle, round } from 'lodash'
import mousePosition from 'mouse-position'
import { SET_ANGLE_INTERVAL, SHOOT_INTERVAL } from '../../common/game/entities/player'
import store from '../store'
import { setAngle, shoot } from '../store/actions'

const mouse = mousePosition()
let lastAngle = null

const screen = {
  x: window.innerWidth,
  y: window.innerHeight
}

const handleAngleChange = throttle(() => {
  const { me } = store.getState()

  if (!me) return

  const player = {
    x: me.position[0] + (screen.x / 2),
    y: me.position[0] + (screen.y / 2)
  }

  const angle = round(Math.atan2(mouse[1] - player.y, mouse[0] - player.x), 2)

  if (lastAngle === null || lastAngle !== angle) {
    lastAngle = angle
    store.dispatch(setAngle(angle))
  }
}, SET_ANGLE_INTERVAL + 5)

mouse.once('move', () => {
  mouse.on('move', handleAngleChange)
  store.subscribe(handleAngleChange)
})

const handleShoot = throttle(() => store.dispatch(shoot()), SHOOT_INTERVAL)

window.addEventListener('click', handleShoot, false)
