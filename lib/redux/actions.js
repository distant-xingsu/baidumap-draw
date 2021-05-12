"use strict";

exports.__esModule = true;
exports.setVars = setVars;
exports.setVarsSession = setVarsSession;
exports.setObjs = setObjs;
exports.appendObjs = appendObjs;
exports.setVisitor = setVisitor;
exports.logout = logout;
exports.setBanners = setBanners;
exports.setLists = setLists;
exports.appendLists = appendLists;
exports.updateListItem = updateListItem;
exports.removeItem = removeItem;
exports.mapSet = mapSet;
exports.mapDelete = mapDelete;
exports.default = exports.MAP_DELETE = exports.MAP_SET = exports.APPEND_OBJS = exports.SET_OBJS = exports.UPDATE_LIST_ITEM = exports.REMOVE_ITEM = exports.APPEND_LISTS = exports.SET_LISTS = exports.SET_BANNERS = exports.SET_VISITOR = exports.SET_VARS_SESSION = exports.SET_VARS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_VARS = 'SET_VARS';
exports.SET_VARS = SET_VARS;
var SET_VARS_SESSION = 'SET_VARS_SESSION';
exports.SET_VARS_SESSION = SET_VARS_SESSION;
var SET_VISITOR = 'SET_VISITOR';
exports.SET_VISITOR = SET_VISITOR;
var SET_BANNERS = 'SET_BANNERS';
exports.SET_BANNERS = SET_BANNERS;
var SET_LISTS = 'SET_LISTS';
exports.SET_LISTS = SET_LISTS;
var APPEND_LISTS = 'APPEND_LISTS';
exports.APPEND_LISTS = APPEND_LISTS;
var REMOVE_ITEM = 'REMOVE_ITEM';
exports.REMOVE_ITEM = REMOVE_ITEM;
var UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
exports.UPDATE_LIST_ITEM = UPDATE_LIST_ITEM;
var SET_OBJS = 'SET_OBJS';
exports.SET_OBJS = SET_OBJS;
var APPEND_OBJS = 'APPEND_OBJS';
exports.APPEND_OBJS = APPEND_OBJS;
var MAP_SET = 'MAP_SET';
exports.MAP_SET = MAP_SET;
var MAP_DELETE = 'MAP_DELETE';
exports.MAP_DELETE = MAP_DELETE;

function setVisitor(visitor) {
  return {
    type: SET_VISITOR,
    visitor: visitor
  };
}

function logout() {
  return {
    type: SET_VISITOR,
    visitor: {
      isLogin: false
    }
  };
}

function setBanners(bannerType, banners) {
  return {
    type: SET_BANNERS,
    bannerType: bannerType,
    banners: banners
  };
}

function setLists(key, list) {
  return {
    type: SET_LISTS,
    key: key,
    list: list
  };
}

function appendLists(key, list) {
  return {
    type: APPEND_LISTS,
    key: key,
    list: list
  };
}

function updateListItem(key, index, item) {
  return {
    type: UPDATE_LIST_ITEM,
    key: key,
    index: index,
    item: item
  };
}

function removeItem(key, index) {
  return {
    type: REMOVE_ITEM,
    key: key,
    index: index
  };
}

function setVars(key, value) {
  return {
    type: SET_VARS,
    key: key,
    value: value
  };
}

function setVarsSession(key, value, isyes) {
  return {
    type: SET_VARS_SESSION,
    key: key,
    value: value,
    isyes: isyes
  };
}

function setObjs(key, value) {
  return {
    type: SET_OBJS,
    key: key,
    value: value
  };
}

function appendObjs(key, objKey, objValue) {
  return {
    type: APPEND_OBJS,
    key: key,
    value: typeof objKey === 'object' ? objKey : _lodash.default.fromPairs([[objKey, objValue]])
  };
}

function mapSet() {
  for (var _len = arguments.length, keyPath = new Array(_len), _key = 0; _key < _len; _key++) {
    keyPath[_key] = arguments[_key];
  }

  var value = keyPath.pop();
  return {
    type: MAP_SET,
    keyPath: keyPath,
    value: value
  };
}

function mapDelete() {
  for (var _len2 = arguments.length, keyPath = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    keyPath[_key2] = arguments[_key2];
  }

  return {
    type: MAP_DELETE,
    keyPath: keyPath
  };
}

var actions = {
  setVars: setVars,
  setVarsSession: setVarsSession,
  setVisitor: setVisitor,
  logout: logout,
  setBanners: setBanners,
  setLists: setLists,
  appendLists: appendLists,
  updateListItem: updateListItem,
  removeItem: removeItem,
  setObjs: setObjs,
  appendObjs: appendObjs,
  mapSet: mapSet,
  mapDelete: mapDelete
};
exports.default = actions;