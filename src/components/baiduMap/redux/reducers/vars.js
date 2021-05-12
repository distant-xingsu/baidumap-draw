import _ from 'lodash';
const actions = require('../actions')

const vars = function (state = {}, action = {}) {
  if (action.type === actions.SET_VARS) {
    return _.assign({}, state, _.fromPairs([[action.key, action.value]]))
  }
  return state
}
export default vars;

