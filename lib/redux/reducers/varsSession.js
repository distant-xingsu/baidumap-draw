"use strict";

exports.__esModule = true;
exports.default = void 0;

var actions = require('../actions'); //将sessionStroage和props结合，页面刷新赋值


var varsSession = function varsSession(state, action) {
  if (state === void 0) {
    state = {};
  }

  if (action === void 0) {
    action = {};
  }

  if (action.type === actions.SET_VARS_SESSION) {
    var reactworksessionstorage = JSON.parse(sessionStorage.getItem("ReactWorkSessionStorage"));
    var newobj = {}; // get用于赋值 调用
    // 如果reactworksessionstorage为空则直接赋值  dispatch(actions.setVarsSession('textwen','Welcome to Setting!','get'));
    // 如果reactworksessionstorage不为空 且reactworksessionstorage内没有要赋值的字段 则直接赋值 否则 不赋值

    if (action.isyes === 'get') {
      if (reactworksessionstorage !== undefined && reactworksessionstorage !== '' && reactworksessionstorage !== null) {
        if (Object.keys(reactworksessionstorage).length !== 0) {
          var isflage = true;
          state = reactworksessionstorage;

          for (var ioi in reactworksessionstorage) {
            if (reactworksessionstorage.hasOwnProperty(ioi)) {
              if (ioi === action.key) {
                isflage = false;
                break;
              }
            }
          }

          if (isflage) {
            newobj[action.key] = action.value;
            sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
          }
        } else {
          newobj[action.key] = action.value;
          sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
        }
      } else {
        newobj[action.key] = action.value;
        sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
      }
    } // del用于删除
    // dispatch(actions.setVarsSession('textwen','','del'));
    else if (action.isyes === 'del') {
        for (var io in state) {
          if (state.hasOwnProperty(io)) {
            if (io === action.key) {
              delete state[io];
            }
          }
        }

        sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
      } // set用于赋值
      // dispatch(actions.setVarsSession('textwen','Welcome to Setting!','set'));
      else if (action.isyes === 'set') {
          newobj[action.key] = action.value;
          sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
        } // 默认set
        else {
            newobj[action.key] = action.value;
            sessionStorage.setItem("ReactWorkSessionStorage", JSON.stringify(Object.assign({}, state, newobj)));
          }

    return Object.assign({}, state, newobj);
  }

  return state;
};

var _default = varsSession;
exports.default = _default;