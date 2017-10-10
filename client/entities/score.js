import d from 'domator'
import css from '../lib/css'
import { Entity } from '../lib/entity'
import withStore from '../store/with-store'

const styles = {
  score: css({
    position: 'absolute',
    left: 0,
    top: 0,
    padding: '5px',
    fontFamily: 'monospace',
    fontSize: '11px',
    userSelect: 'none',
    textAlign: 'center'
  }),

  name: css({
    display: 'inline-block',
    padding: '0 2px',
    width: '50px',
    textAlign: 'right'
  }),

  points: css({
    display: 'inline-block',
    padding: '0 2px',
    width: '50px',
    textAlign: 'left'
  })
}

function removeChildren (el) {
  while (el.firstChild) el.removeChild(el.firstChild)
  return el
}

class Score extends Entity {
  render () {
    this.el = d(`.score[style="${styles.score}"]`)
    document.body.appendChild(this.el)
  }

  update () {
    removeChildren(this.el)

    d(this.el, this.state.map(({ name, kills, deads }) => {
      return [
        'div', [
          `span[style="${styles.name}"] ${name}`,
          `span[style="${styles.points}"] ${kills}/${deads}`
        ]
      ]
    }))
  }

  remove () {
    document.body.removeChild(this.el)
  }
}

function byKillsAndDeads (playerA, playerB) {
  const pointsA = playerA.kills - playerA.deads
  const pointsB = playerB.kills - playerB.deads

  return pointsA < pointsB ? 1 : pointsA > pointsB ? -1 : 0
}

export default withStore(Score, (state) => {
  return Object.values(state.room.players)
    .map(({ name, kills, deads }) => ({ name, kills, deads }))
    .sort(byKillsAndDeads)
})
