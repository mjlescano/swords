import pickAs from '@f/pick-as'
import deepPick from 'deepPick'
import store from '.'

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

export default function withStore (WrappedEntity, mapper) {
  return class EntityWrapper extends WrappedEntity {
    init (...args) {
      const mapStoreToState = mapStoreToStateFactory(mapper)
      this.store = store

      this.state = mapStoreToState(store.getState())

      this.unsubscribe = this.store.subscribe(() => {
        const nextState = mapStoreToState(store.getState())
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
