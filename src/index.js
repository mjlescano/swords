import shapes from '../common/shapes'
import store, { getCurrentPlayer } from'./store'
import './room'
import Fps from './entities/fps'

new Fps(store, document.body)

const width = window.innerWidth
const height = window.innerHeight

const two = new Two({
  type: Two.Types.webgl,
  autostart: false,
  width,
  height
}).appendTo(document.body)

const playerPath = shapes.player.map(([x, y]) => new Two.Anchor(x, y))

const renderPlayer = () => {
  const render = two.makePath(playerPath, false)
  render.fill = '#333'
  render.noStroke()
  return render
}

const players = new Map()

let rendering = 0
const unsubscribe = store.subscribe(() => {
  if (rendering > 0) console.log('ouch!', rendering)
  rendering++
  const state = store.getState()

  if (!state.room || !state.room.players) return

  const playersIds = Object.keys(state.room.players)
  const playersToRemove = new Set(players.keys())

  playersIds.forEach((id) => {
    const [x, y] = state.room.players[id].position

    let player = players.get(id)

    if (!player) {
      player = renderPlayer()
      players.set(id, player)
    }

    player.translation.set(x, y)
    playersToRemove.delete(id)
  })

  playersToRemove.forEach((id) => {
    const player = players.get(id)
    player.remove()
    players.delete(id)
  })

  two.render()
  rendering--
})

// import p2 from 'p2'
// import createGameLoop from 'browser-game-loop'
// import Two from './lib/two'
//
// const width = window.innerWidth
// const height = window.innerHeight
//
// const player = new p2.Body({
//   mass: 5,
//   position: [width / 2, height / 2]
// })
//
// player.addShape(new p2.Convex({
//   vertices: [
//     [10, 0],
//     [20, 22],
//     [0, 22]
//   ]
// }))
//
// // const ground = new p2.Body({ mass: 0 })
// //
// // ground.addShape(new p2.Plane())
//
// world.addBody(player)
// // world.addBody(ground)
//
// const two = new Two({
//   type: Two.Types.webgl,
//   autostart: false,
//   width,
//   height
// }).appendTo(document.body)
//
// const playerRender = two.makePath([
//   new Two.Anchor(10, 0),
//   new Two.Anchor(20, 22),
//   new Two.Anchor(0, 22)
// ], false)
//
// playerRender.fill = '#333'
// playerRender.noStroke()
//
// const loop = createGameLoop({
//   updateTimeStep: 1000 / 30,
//   fpsFilterStrength: 20,
//   slow: 1,
//   input: function () {  },
//   update: (step) => world.step(step),
//   render: function (interp) {
//     playerRender.translation.set(player.position[0], player.position[1])
//     two.render()
//   }
// })
//
// loop.start()
