const Two = window.Two

export default Two

export const shapeToAnchor = (path) => {
  return path.map(([x, y]) => new Two.Anchor(x, y))
}
