export default function mixin (...mixins) {
  const constructs = []

  function Mixin (...args) {
    constructs.forEach((c) => c.apply(this, args))
  }

  Mixin.prototype.is = function is (mixin) {
    return mixins.includes(mixin)
  }

  mixins.forEach((mixin) => {
    Object.getOwnPropertyNames(mixin).forEach((prop) => {
      if (prop === 'constructor') {
        return constructs.unshift(mixin[prop])
      }

      if (Mixin.prototype[prop]) {
        throw new Error(`property '${prop}' collide.`)
      }

      Mixin.prototype[prop] = mixin[prop]
    })
  })

  return Mixin
}

export const bindAll = {
  constructor () {
    const proto = Object.getPrototypeOf(this)
    const mixin = Object.getPrototypeOf(proto)

    const attrs = [
      ...Object.getOwnPropertyNames(proto),
      ...Object.getOwnPropertyNames(mixin)
    ]

    attrs.forEach((attr) => {
      if (attr === 'constructor') return
      if (typeof this[attr] !== 'function') return
      this[attr] = this[attr].bind(this)
    })
  }
}
