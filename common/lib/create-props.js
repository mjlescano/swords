import { forEach } from 'lodash'
import throttle from './throttle'

export default (entity, initialProps = {}) => {
  const properties = createProps(initialProps)
  const values = Object.values(properties)

  const props = {
    set (key, value) {
      if (value === undefined) {
        forEach(key, (value, key) => props.setProp(key, value))
        return props
      }

      console.log(` -> setProp ${key}`, value)

      const prop = properties[key]

      if (!prop) throw new Error(`Nonexistent prop '${key}'.`)

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
        const values = prop.toJSON()
        if (values === undefined) return

        if (typeof values !== 'object') {
          throw new Error('Prop values returned by the update method, should be an object')
        }

        Object.assign(json, values)
      })

      return json
    }
  }

  return props
}

const createProps = (entity, props) => {
  return Object.keys(props).reduce((properties, key) => {
    const prop = props[key]

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

    properties[key] = {
      set: throttle(function (newValue) {
        value = newValue
      }, interval),

      update: function () {
        if (value === undefined) return

        if (validate(entity, value)) update(entity, value)

        lastValue = value
        value = undefined
      },

      toJSON: function () {
        return toJSON(entity, lastValue)
      }
    }

    return properties
  }, {})
}
