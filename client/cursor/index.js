import { throttle, round } from 'lodash'
import mousePosition from 'mouse-position'
import { SET_ANGLE_INTERVAL, SHOOT_INTERVAL } from '../../common/game/entities/player'
import store from '../store'
import { setAngle, shoot } from '../store/actions'

const mouse = mousePosition()
let lastAngle = null

const handleAngleChange = throttle(() => {
  const { me } = store.getState()

  if (!me) return

  const player = me.position
  const cursor = [mouse[0], mouse[1]]

  const angle = round(Math.atan2(cursor[1] - player[1], cursor[0] - player[0]), 3)

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
