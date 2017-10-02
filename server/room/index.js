import { Room } from 'colyseus'
import Engine from '../../common/engine'

export default class SwordsRoom extends Room {
  constructor (options) {
    super(options)

    this.setPatchRate(50)
    this.setState(new Engine())
    this.state.run()
  }

  onDispose () {
    this.state.stop()
  }

  onJoin ({ id }) {
    this.state.addPlayer({
      id
    })
  }

  onLeave (client) {
    this.state.removePlayer(client)
  }

  onMessage (client, data) {
    this.state.dispatch(client, data)
  }
}
