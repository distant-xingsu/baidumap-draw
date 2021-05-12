const actions = require('../actions')

const visitor = function (state = null, action = {}) {
  if (action.type === actions.SET_VISITOR) {
    return action.visitor
  }

  return state
}

export default visitor
