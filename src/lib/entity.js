import deepEqual from 'fast-deep-equal'
import pickAs from '@f/pick-as'
import deepPick from 'deepPick'

export default class Entity {
  constructor (store, parent) {
    this.store = store
    this.parent = parent

    this.pick = null

    this.setState = this.setState.bind(this)
    this.render = this.render.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)

    this.props = this.mapStateToProps(this.store.getState())

    this.el = this.render()

    this.unsubscribe = this.store.subscribe(() => {
      const nextProps = this.mapStateToProps(this.store.getState())
      this.setState(nextProps)
    })
  }

  mapStateToProps (state = {}) {
    if (!this.pick) return state
    if (Array.isArray(this.pick)) {
      return deepPick(state, this.pick)
    } else {
      return pickAs(this.pick, state)
    }
  }

  setState (nextProps = {}) {
    if (deepEqual(this.props, nextProps)) return

    this.props = nextProps
    this.update()
  }

  render () {
    return null
  }

  update () {
    return null
  }

  remove () {
    this.unsubscribe()
    if (this.el) this.el.remove()
  }
}
