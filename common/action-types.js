module.exports = [
  'UPDATE_NAME'
].reduce((actionTypes, type, index) => {
  actionTypes[type] = index
  return actionTypes
}, {})
