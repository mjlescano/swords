module.exports = [
  'SET_PLAYER_NAME',
  'SET_PLAYER_ANGLE',
  'SET_PLAYER_MOVEMENT'
].reduce((actionTypes, type, index) => {
  actionTypes[type] = index
  return actionTypes
}, {})
