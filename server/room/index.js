import { Room } from 'colyseus'
import Game from '../../common/game'

export default class SwordsRoom extends Room {
  constructor (options) {
    super(options)

    this.setPatchRate(16)
    this.setState(new Game())
    this.state.run()
  }

  onDispose () {
    this.state.pause()
  }

  onJoin ({ id }) {
    this.state.addPlayer(id)
  }

  onLeave ({ id }) {
    this.state.removePlayer(id)
  }

  onMessage ({ id }, data) {
    this.state.dispatch(id, data)
  }
}
