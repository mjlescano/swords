export default function throttle (fn, interval) {
  let lastCall = 0

  return function throttled () {
    const now = Number(new Date())
    if (now - lastCall < interval) return
    lastCall = now
    return fn.apply(this, arguments)
  }
}
