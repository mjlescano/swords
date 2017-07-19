const reducers = {
  SET_CURRENT_PLAYER: (state, { payload: { currentPlayer } }) => currentPlayer
}

export default (state = null, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  } else {
    return state
  }
}
