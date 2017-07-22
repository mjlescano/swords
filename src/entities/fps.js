import d from 'domator'
import css from '../lib/css'
import { Entity, withStore } from '../lib/entity'

const style = css({
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '5px',
  fontFamily: 'monospace',
  fontSize: '11px'
})

class Fps extends Entity {
  init (parent = document.body) {
    this.parent = parent
  }

  render () {
    const el = this.el = d(`.fps[style="${style}"] ${this.state.fps}`)
    this.parent.appendChild(el)
  }

  update () {
    this.el.innerHTML = this.state.fps
  }

  remove () {
    this.parent.removeChild(this.el)
  }
}

export default withStore(Fps, { 'room.fps': 'fps' })
