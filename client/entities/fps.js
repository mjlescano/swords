import d from 'domator'
import css from '../lib/css'
import { Entity } from '../lib/entity'
import withStore from '../store/with-store'

const style = css({
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '5px',
  fontFamily: 'monospace',
  fontSize: '11px',
  userSelect: 'none'
})

class Fps extends Entity {
  init () {
    this.parent = document.body
  }

  render () {
    const { fps } = this.state
    const el = this.el = d(`.fps[style="${style}"] ${fps}`)
    this.parent.appendChild(el)
  }

  update () {
    this.el.innerHTML = this.state.fps || ''
  }

  remove () {
    this.parent.removeChild(this.el)
  }
}

export default withStore(Fps, { 'room.fps': 'fps' })
