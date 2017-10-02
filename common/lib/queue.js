export default function createQueue () {
  const queue = new Set()
  queue.flush = flush.bind(queue)
  return queue
}

function flush () {
  this.forEach((fn) => fn())
  this.clear()
  return this
}
