module.exports = class DumpableMap extends Map {
  toJSON () {
    const values = {}
    for (const [key, val] of this.entries()) values[key] = val
    return values
  }
}
