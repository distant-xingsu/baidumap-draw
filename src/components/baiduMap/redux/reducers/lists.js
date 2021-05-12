import _ from 'lodash';

const actions = require('../actions')

const lists = function (state = {}, action = {}) {
    if (action.type === actions.SET_LISTS) {
        return _.assign({}, state, _.fromPairs([[action.key, action.list]]))
    }

    if (action.type === actions.APPEND_LISTS) {
        let oldList = state[action.key] || []
        let newList = oldList.concat(action.list)
        return _.assign({}, state, _.fromPairs([[action.key, newList]]))
    }
    if (action.type === actions.REMOVE_ITEM) {
        let currentList = state[action.key]
        currentList.splice(action.index, 1)
        return _.assign({}, state, _.fromPairs([[action.key, [...currentList]]]))
    }
    if (action.type === actions.UPDATE_LIST_ITEM) {
        let newList = _.clone(state[action.key] || [])
        newList[action.index] = _.clone(action.item)
        return _.assign({}, state, _.fromPairs([[action.key, newList]]))
    }

    return state
}

export default lists;
