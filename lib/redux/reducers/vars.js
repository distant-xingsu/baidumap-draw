"use strict";

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = require('../actions');

var vars = function vars(state, action) {
  if (state === void 0) {
    state = {};
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.SET_VARS) {
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.key, action.value]]));
  }

  return state;
};

var _default = vars;
exports.default = _default;