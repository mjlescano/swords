export default function createCollection (Entity) {
  const entities = new Map()

  return {
    create (id, opts) {
      if (!id) throw new Error('Collection entities must have an id')
      const entity = new Entity(opts)
      entities.set(id, entity)
      return entity
    },

    set (id, entity) {
      entities.set(id, entity)
      return this
    },

    get (id) {
      return entities.get(id)
    },

    remove (id, doRemove = true) {
      const entity = entities.get(id)
      if (doRemove) entity.remove()
      entities.delete(id)
      return entity
    },

    toJSON () {
      const json = {}

      for (const [key, entity] of entities) {
        json[key] = entity.toJSON()
      }

      return json
    }
  }
}
