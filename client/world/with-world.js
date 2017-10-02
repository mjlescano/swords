import world from '.'

export default function withWorld (WrappedEntity) {
  return class EntityWrapper extends WrappedEntity {
    init (...args) {
      this.world = world
      super.init(...args)
    }
  }
}
