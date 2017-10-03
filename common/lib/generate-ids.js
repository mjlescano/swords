export default () => {
  let next = 0

  return () => {
    next += 1
    if (next === 1000000) next = 1
    return next.toString(36)
  }
}
