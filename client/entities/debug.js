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
  'me.name': 'name',
  'me.angle': 'angle',
  'me.position': 'position'
}

const stateValues = Object.values(valuesToDebug)

class Debug extends Entity {
  render () {
    const el = this.el = d(`.fps[style="${style}"] ${this.getText()}`)
    document.body.appendChild(el)
  }

  getText () {
    return stateValues.map((val) => this.state[val]).join('<br/>')
  }

  update () {
    this.el.innerHTML = this.getText()
  }

  remove () {
    document.body.removeChild(this.el)
  }
}

export default withStore(Debug, valuesToDebug)
