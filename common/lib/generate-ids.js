const { MAX_SAFE_INTEGER } = Number

export default () => {
  let next = 0
  return () => {
    next = next === MAX_SAFE_INTEGER ? 1 : next + 1
    return next.toString(36)
  }
}
