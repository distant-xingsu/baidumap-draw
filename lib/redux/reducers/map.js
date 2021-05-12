"use strict";

exports.__esModule = true;
exports.default = void 0;

var _immutable = require("immutable");

var actions = require('../actions');

var maps = function maps(state, action) {
  if (state === void 0) {
    state = (0, _immutable.Map)({});
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.MAP_SET) {
    if (typeof action.value === 'function') {
      return state.updateIn(action.keyPath, action.value);
    } else {
      return state.setIn(action.keyPath, action.value);
    }
  }

  if (action.type === actions.MAP_DELETE) {
    return state.deleteIn(action.keyPath);
  }

  return state;
};

var _default = maps;
exports.default = _default;