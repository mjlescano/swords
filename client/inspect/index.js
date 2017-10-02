import Engine from '../../common/engine'

const simulation = new p2.WebGLRenderer(function () {
  const engine = new Engine()
  this.setWorld(engine.world)
})

export default simulation
