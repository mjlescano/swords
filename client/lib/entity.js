import deepEqual from 'fast-deep-equal'

export class Entity {
  constructor (state = {}, ...args) {
    this.state = state
    this.init(...args)
    this.render()
  }

  setState (nextState = {}) {
    if (deepEqual(this.state, nextState)) return
    this.state = nextState
    this.update()
  }

  init () {
    return null
  }

  render () {
    return null
  }

  update () {
    return null
  }

  remove () {
    return null
  }
}

export class EntityGroup extends Entity {
  init (Child) {
    this.Child = Child
    this.entities = new Map()
  }

  render () {
    const { Child } = this

    for (const [key, state] of Object.entries(this.state)) {
      const entity = new Child(state)
      this.entities.set(key, entity)
    }
  }

  update () {
    const { Child } = this

    for (const [key, entity] of this.entities) {
      if (this.state.hasOwnProperty(key)) continue
      entity.remove()
      this.entities.delete(key)
    }

    for (const [key, state] of Object.entries(this.state)) {
      const entity = this.entities.get(key)

      if (entity) {
        entity.setState(state)
      } else {
        this.entities.set(key, new Child(state))
      }
    }
  }

  remove () {
    for (const [key, entity] of this.entities) {
      entity.remove()
      this.entities.delete(key)
    }
  }
}
