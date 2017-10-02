export default (state = null, { type, payload }) => {
  if (type !== 'SET_ME') return state
  const { me } = payload
  return me
}
