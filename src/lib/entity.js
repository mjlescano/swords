import deepEqual from 'fast-deep-equal'
import pickAs from '@f/pick-as'
import deepPick from 'deepPick'
import store from '../store'
import world from '../world'

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
      this.entities.set(key, new Child(state))
    }
  }

  update () {
    const { Child } = this

    for (const [key, entity] of this.entities) {
      if (key in this.state) continue
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

export function withStore (WrappedEntity, mapper) {
  return class EntityWrapper extends WrappedEntity {
    init (...args) {
      this.mapStoreToState = mapStoreToStateFactory(mapper)
      this.store = store

      this.state = this.mapStoreToState(store.getState())

      this.unsubscribe = this.store.subscribe(() => {
        const nextState = this.mapStoreToState(store.getState())
        this.setState(nextState)
      })

      super.init(...args)
    }

    remove () {
      this.unsubscribe()
      super.remove()
    }
  }
}

function mapStoreToStateFactory (mapper) {
  if (typeof mapper === 'function') {
    return mapper
  } else if (Array.isArray(mapper)) {
    return (state) => deepPick(state, mapper)
  } else if (typeof mapper === 'object') {
    return (state) => pickAs(mapper, state)
  }

  return (state) => state
}

export function withWorld (WrappedEntity) {
  return class EntityWrapper extends WrappedEntity {
    init (...args) {
      this.world = world
      super.init(...args)
    }
  }
}
