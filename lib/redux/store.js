"use strict";

exports.__esModule = true;
exports.subscribe = exports.getState = exports.dispatch = exports.default = void 0;

var _redux = require("redux");

var _vars = _interopRequireDefault(require("./reducers/vars"));

var _varsSession = _interopRequireDefault(require("./reducers/varsSession"));

var _objs = _interopRequireDefault(require("./reducers/objs"));

var _visitor = _interopRequireDefault(require("./reducers/visitor"));

var _lists = _interopRequireDefault(require("./reducers/lists"));

var _banners = _interopRequireDefault(require("./reducers/banners"));

var _map = _interopRequireDefault(require("./reducers/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainReducer = (0, _redux.combineReducers)({
  vars: _vars.default,
  varsSession: _varsSession.default,
  objs: _objs.default,
  visitor: _visitor.default,
  banners: _banners.default,
  lists: _lists.default,
  maps: _map.default
});
var store = (0, _redux.createStore)(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
exports.default = store;
var dispatch = store.dispatch,
    getState = store.getState,
    subscribe = store.subscribe;
exports.subscribe = subscribe;
exports.getState = getState;
exports.dispatch = dispatch;