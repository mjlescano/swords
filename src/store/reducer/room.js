const reducers = {
  RECEIVE_ROOM: (state, { payload }) => payload
}

export default (state = null, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  } else {
    return state
  }
}
