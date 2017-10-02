import { mapValues as _mapValues, forEach as _forEach } from 'lodash/fp'
import throttle from './throttle'

const mapValues = _mapValues.convert({ 'cap': false })
const forEach = _forEach.convert({ 'cap': false })

export default (initialProps = {}) => {
  const props = createProps(initialProps)
  const values = Object.values(props)

  return {
    setProp (key, value) {
      if (value === undefined) {
        forEach((value, key) => this.setProp(key, value), key)
        return this
      }

      console.log(` -> setProp ${key}`, value)

      const prop = props[key]

      if (!prop) {
        throw new Error(`Nonexistent prop '${key}'.`)
      }

      prop.set.call(this, value)

      return this
    },

    update () {
      forEach((prop) => prop.update.call(this), props)
      return this
    },

    toJSON (prop) {
      if (prop) return props[prop].toJSON.call(this)

      const json = {}

      values.forEach((prop) => {
        const values = prop.toJSON.call(this)
        if (values === undefined) return

        if (typeof values !== 'object') {
          throw new Error('Prop values returned by the update method, should be an object')
        }

        Object.assign(json, values)
      })

      return json
    }
  }
}

const createProps = mapValues((options = {}, name) => {
  const {
    validate = function (val) { return true },
    update = function (val) { },
    toJSON = function (val) {
      return val === undefined ? undefined : { [name]: val }
    },
    interval = 25
  } = options

  let value
  let lastValue

  return {
    set: throttle(function (newValue) {
      value = newValue
    }, interval),

    update: function () {
      if (value === undefined) return

      if (validate.call(this, value)) {
        update.call(this, value)
      }

      lastValue = value
      value = undefined
    },

    toJSON: function () {
      return toJSON.call(this, lastValue)
    }
  }
})
