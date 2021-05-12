"use strict";

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = require('../actions');

var lists = function lists(state, action) {
  if (state === void 0) {
    state = {};
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.SET_LISTS) {
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.key, action.list]]));
  }

  if (action.type === actions.APPEND_LISTS) {
    var oldList = state[action.key] || [];
    var newList = oldList.concat(action.list);
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.key, newList]]));
  }

  if (action.type === actions.REMOVE_ITEM) {
    var currentList = state[action.key];
    currentList.splice(action.index, 1);
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.key, [].concat(currentList)]]));
  }

  if (action.type === actions.UPDATE_LIST_ITEM) {
    var _newList = _lodash.default.clone(state[action.key] || []);

    _newList[action.index] = _lodash.default.clone(action.item);
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.key, _newList]]));
  }

  return state;
};

var _default = lists;
exports.default = _default;