import _ from 'lodash';
const actions = require('../actions')

const objs = function (state = {}, action = {}) {
    if (action.type === actions.APPEND_OBJS) {
        let obj = _.assign({}, state[action.key], action.value)
        return _.assign({}, state, _.fromPairs([[action.key, obj]]))
    }

    if (action.type === actions.SET_OBJS) {
        return _.assign({}, state, _.fromPairs([[action.key, action.value]]))
    }

    return state
}

export default objs;
