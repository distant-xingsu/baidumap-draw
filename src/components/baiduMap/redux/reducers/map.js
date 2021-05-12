import {Map} from 'immutable'
const actions = require('../actions')

const maps =function (state = Map({}), action = {}) {
  if (action.type === actions.MAP_SET) {
    if (typeof action.value === 'function') {
      return state.updateIn(action.keyPath, action.value)
    } else {
      return state.setIn(action.keyPath, action.value)
    }
  }

  if (action.type === actions.MAP_DELETE) {
    return state.deleteIn(action.keyPath)
  }

  return state
};

export default maps
