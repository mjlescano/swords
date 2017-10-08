import { forEach, mapValues, throttle } from 'lodash'

export default (entity, initialProps = {}) => {
  const properties = createProps(entity, initialProps)
  const values = Object.values(properties)

  const props = {
    set (key, value) {
      if (value === undefined) {
        forEach(key, (value, key) => props.set(key, value))
        return props
      }

      if (!properties.hasOwnProperty(key)) {
        throw new Error(`Nonexistent prop '${key}'.`)
      }

      const prop = properties[key]

      prop.set(value)

      return props
    },

    update () {
      forEach(properties, (prop) => prop.update())
      return props
    },

    toJSON (prop) {
      if (prop !== undefined && typeof prop !== 'string') {
        throw new Error('Invalid prop value')
      }

      if (prop) return properties[prop].toJSON()

      const json = {}

      values.forEach((prop) => {
        const value = prop.toJSON()
        if (value === undefined) return

        if (typeof value !== 'object') {
          throw new Error('Prop value returned by the update method should be an object')
        }

        Object.assign(json, value)
      })

      return json
    }
  }

  return props
}

const createProps = (entity, props) => {
  return mapValues(props, (prop, key) => {
    const {
      validate = function (entity, val) { return true },
      update = function (entity, val) { },
      toJSON = function (entity, val) {
        return val === undefined ? undefined : { [key]: val }
      },
      interval = 25
    } = prop

    let value
    let lastValue

    return {
      set: throttle((newValue) => {
        console.log(` => setProp ${key}`, newValue)
        value = newValue
      }, interval),

      update () {
        if (value === undefined) return

        if (validate(entity, value)) update(entity, value)

        lastValue = value
        value = undefined
      },

      toJSON () {
        return toJSON(entity, lastValue)
      }
    }
  })
}
