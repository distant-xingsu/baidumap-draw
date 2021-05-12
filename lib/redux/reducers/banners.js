"use strict";

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = require('../actions');

var banners = function banners(state, action) {
  if (state === void 0) {
    state = {};
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.SET_BANNERS) {
    return _lodash.default.assign({}, state, _lodash.default.fromPairs([[action.bannerType, action.banners]]));
  }

  return state;
};

var _default = banners;
exports.default = _default;