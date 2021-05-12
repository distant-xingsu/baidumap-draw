import {createStore, combineReducers} from 'redux';

import vars from './reducers/vars';
import varsSession from './reducers/varsSession';
import objs from './reducers/objs';
import visitor from './reducers/visitor';
import lists from './reducers/lists';
import banners from './reducers/banners';
import maps from './reducers/map';

const mainReducer = combineReducers({
  vars,
  varsSession,
  objs,
  visitor,
  banners,
  lists,
  maps,
});

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const {dispatch, getState, subscribe} = store;

export {
  store as default,
  dispatch,
  getState,
  subscribe
};
