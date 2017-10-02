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
  textAlign: 'right',
  userSelect: 'none'
})

const valuesToDebug = {
  currentPlayer: 'id',
  'room.fps': 'fps'
}

const stateValues = Object.values(valuesToDebug)

class Debug extends Entity {
  init () {
    this.parent = document.body
  }

  render () {
    const el = this.el = d(`.fps[style="${style}"] ${this.getText()}`)
    this.parent.appendChild(el)
  }

  getText () {
    return stateValues.map((val) => this.state[val]).join('<br/>')
  }

  update () {
    this.el.innerHTML = this.getText()
  }

  remove () {
    this.parent.removeChild(this.el)
  }
}

export default withStore(Debug, valuesToDebug)
