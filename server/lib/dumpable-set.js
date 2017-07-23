module.exports = class DumpableSet extends Set {
  toJSON () {
    const values = []
    for (const val of this.values()) values.push(val.toJSON())
    return values
  }
}
