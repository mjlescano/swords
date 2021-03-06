import throttle from 'lodash/throttle'
import Mousetrap from 'mousetrap'
import { MOVE_INTERVAL } from '../../common/game/entities/player'
import store from '../store'
import { setImpulse } from '../store/actions'

const arrows = {
  left: false,
  right: false,
  up: false,
  down: false,
  count: 0
}

const handleArrows = throttle(() => {
  const { left, right, up, down } = arrows
  const x = (left ? -1 : 0) + (right ? 1 : 0)
  const y = (up ? -1 : 0) + (down ? 1 : 0)
  store.dispatch(setImpulse(x, y))
  if (arrows.count > 0) handleArrows()
}, MOVE_INTERVAL + 5)

const handleArrow = (direction, pressed) => {
  return () => {
    const current = arrows[direction]
    if (pressed === current) return

    arrows[direction] = pressed
    arrows.count += pressed ? 1 : -1

    handleArrows()
  }
}

;[
  ['w', 'up'],
  ['a', 'left'],
  ['s', 'down'],
  ['d', 'right']
].forEach(([key, direction]) => {
  Mousetrap.bind(key, handleArrow(direction, true), 'keydown')
  Mousetrap.bind(key, handleArrow(direction, false), 'keyup')
})
