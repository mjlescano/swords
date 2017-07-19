import d from 'domator'
import css from '../lib/css'
import Entity from '../lib/entity'

export default class Fps extends Entity {
  constructor (...args) {
    super(...args)
    this.pick = { 'room.fps': 'fps' }
  }

  render () {
    const { fps } = this.props

    const style = css({
      position: 'absolute',
      right: 0,
      top: 0,
      padding: '5px',
      fontFamily: 'monospace',
      fontSize: '11px'
    })

    const el = d(`.fps[style="${style}"] ${fps}`)

    this.parent.appendChild(el)

    return el
  }

  update () {
    this.el.innerHTML = this.props.fps
  }

  remove () {
    this.unsubscribe()
    this.parent.removeChild(this.el)
  }
}
