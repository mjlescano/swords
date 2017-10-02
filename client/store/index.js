import { createStore } from 'redux'
import reducer from './reducer'

const devTools = (typeof window !== 'undefined' || undefined) &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducer, undefined, devTools)

export default store
