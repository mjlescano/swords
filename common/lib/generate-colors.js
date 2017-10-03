export const COLORS = [
  '#d7454c',
  '#4ab4e5',
  '#4CdbA5',
  '#e7be31'
]

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export default () => {
  const max = COLORS.length - 1
  let current = random(0, max)

  return () => {
    current = current === max ? 0 : ++current
    return COLORS[current]
  }
}
