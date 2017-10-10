import { WIDTH, HEIGHT } from '../../common/game/world'
import { Entity } from '../lib/entity'
import withWorld from '../world/with-world'

const Dot = withWorld(class extends Entity {
  render () {
    const [x, y] = this.state
    const el = this.el = this.world.makeEllipse(x, y, 1)

    el.fill = '#0f0'
    el.noStroke()

    this.update()
  }

  update () {
    const [x, y] = this.state
    this.el.translation.set(x, y)
  }

  remove () {
    this.el.remove()
  }
})

export default () => {
  for (let x = 100; x >= 0; x--) {
    for (let y = 100; y >= 0; y--) {
      new Dot([x, y])
    }
  }
}
