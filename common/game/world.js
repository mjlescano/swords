import Matter from '../lib/matter-js'

export const WIDTH = 600
export const HEIGHT = 600

const createWalls = () => {
  const opts = { isStatic: true }
  const x = WIDTH / 2
  const y = HEIGHT / 2

  return [
    Matter.Bodies.rectangle(0, -y, WIDTH + 20, 2, opts),
    Matter.Bodies.rectangle(x, 0, 2, HEIGHT + 20, opts),
    Matter.Bodies.rectangle(0, y, WIDTH + 20, 2, opts),
    Matter.Bodies.rectangle(-x, 0, 2, HEIGHT + 20, opts)
  ]
}

export default () => {
  const world = Matter.World.create({
    label: 'World',
    gravity: {
      x: 0,
      y: 0,
      scale: 0.001
    },
    bounds: {
      min: { x: -(WIDTH / 2) - 2, y: -(HEIGHT / 2) - 2 },
      max: { x: (WIDTH / 2) + 2, y: (HEIGHT / 2) + 2 }
    }
  })

  Matter.World.add(world, createWalls())

  return world
}
