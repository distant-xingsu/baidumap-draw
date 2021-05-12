import _ from 'lodash';
const actions = require('../actions')

const banners = function (state = {}, action = {}) {
  if (action.type === actions.SET_BANNERS) {
    return _.assign({}, state, _.fromPairs([[action.bannerType, action.banners]]))
  }

  return state
}


export default banners;
