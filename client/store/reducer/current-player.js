export default (state = null, { type, payload }) => {
  if (type !== 'SET_CURRENT_PLAYER') return state
  const { currentPlayer } = payload
  return currentPlayer
}
