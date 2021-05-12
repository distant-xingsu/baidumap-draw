"use strict";

exports.__esModule = true;
exports.default = void 0;

var actions = require('../actions');

var visitor = function visitor(state, action) {
  if (state === void 0) {
    state = null;
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.SET_VISITOR) {
    return action.visitor;
  }

  return state;
};

var _default = visitor;
exports.default = _default;